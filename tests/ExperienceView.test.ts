import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ExperienceView from '@/features/experience/ExperienceView.vue'
import { educationNodes, experienceNodes } from '@/features/experience/experience.data'

describe('ExperienceView', () => {
  it('leads with the professional experience section', () => {
    const wrapper = mount(ExperienceView)
    const sections = wrapper.findAll('section[aria-labelledby]')

    expect(sections.map((section) => section.attributes('aria-labelledby'))).toEqual([
      'employment-title',
      'education-title',
    ])
    expect(wrapper.get('#employment-title').text()).toContain("Where I've put it to work.")

    wrapper.unmount()
  })

  it('renders the schooling chain with its placeholder entries', () => {
    const wrapper = mount(ExperienceView)
    const section = wrapper.get('section[aria-labelledby="education-title"]')
    const chain = wrapper.findAll('ol[aria-label="Education path"] > li')

    expect(section.text()).toContain('Schooling')
    expect(chain).toHaveLength(educationNodes.length)

    for (const node of educationNodes) {
      expect(section.text()).toContain(node.title)
      expect(section.text()).toContain(node.body)
    }

    wrapper.unmount()
  })

  it('renders both DocNetwork roles in the experience chain', () => {
    const wrapper = mount(ExperienceView)
    const section = wrapper.get('section[aria-labelledby="employment-title"]')
    const items = wrapper.findAll('ol[aria-label="Roles held at DocNetwork"] > li')

    expect(items).toHaveLength(experienceNodes.length)
    expect(items.map((item) => item.get('h3').text())).toEqual([
      'Full Stack Developer I',
      'Full Stack Developer II',
    ])

    for (const node of experienceNodes) {
      expect(section.text()).toContain('DocNetwork')
      expect(section.text()).toContain(node.body)
    }

    expect(section.text()).toContain('Junior')
    expect(section.text()).toContain('Mid-level')

    wrapper.unmount()
  })
})
