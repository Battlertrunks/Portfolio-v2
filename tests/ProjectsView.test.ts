import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'

import ProjectsView from '@/features/projects/ProjectsView.vue'
import { projects } from '@/features/projects/projects.data'

async function nextFrame() {
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
  await nextTick()
}

describe('ProjectsView', () => {
  it('renders one anchored section per project', () => {
    const wrapper = mount(ProjectsView)
    const sections = wrapper.findAll('ol > li')

    expect(sections).toHaveLength(projects.length)
    expect(sections.map((section) => section.attributes('id'))).toEqual(
      projects.map((project) => project.id),
    )

    wrapper.unmount()
  })

  it('links the sidebar to every project section', () => {
    const wrapper = mount(ProjectsView)
    const links = wrapper.findAll('nav[aria-label="Project sections"] a')

    expect(links.map((link) => link.attributes('href'))).toEqual(
      projects.map((project) => `#${project.id}`),
    )

    wrapper.unmount()
  })

  it('renders each project title, skills, description, and media', () => {
    const wrapper = mount(ProjectsView)

    for (const project of projects) {
      const section = wrapper.get(`#${project.id}`)

      expect(section.text()).toContain(project.title)
      expect(section.text()).toContain(project.description)

      for (const tag of project.tags) {
        expect(section.text()).toContain(tag)
      }

      expect(section.findAll('img')).toHaveLength(project.media?.length ?? 0)
    }

    wrapper.unmount()
  })

  it('marks a sidebar link as current when it is clicked', async () => {
    const wrapper = mount(ProjectsView)
    const links = wrapper.findAll('nav[aria-label="Project sections"] a')
    const target = links[1]

    expect(target).toBeDefined()

    await target?.trigger('click')

    expect(target?.attributes('aria-current')).toBe('location')

    wrapper.unmount()
  })

  it('keeps a clicked link current until the user scrolls again', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const wrapper = mount(ProjectsView, { attachTo: container })
    const links = wrapper.findAll('nav[aria-label="Project sections"] a')
    const secondProjectLink = links[1]
    const thirdProjectLink = links[2]

    expect(secondProjectLink).toBeDefined()
    expect(thirdProjectLink).toBeDefined()

    await secondProjectLink?.trigger('click')

    window.dispatchEvent(new Event('scroll'))
    await nextFrame()

    expect(secondProjectLink?.attributes('aria-current')).toBe('location')
    expect(thirdProjectLink?.attributes('aria-current')).toBeUndefined()

    window.dispatchEvent(new WheelEvent('wheel'))
    window.dispatchEvent(new Event('scroll'))
    await nextFrame()

    expect(thirdProjectLink?.attributes('aria-current')).toBe('location')

    wrapper.unmount()
    container.remove()
  })
})
