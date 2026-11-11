import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import NodalChain from '@/components/NodalChain.vue'

const entries = [
  {
    id: 'role-one',
    title: 'Full Stack Developer I',
    subtitle: 'DocNetwork',
    period: '2024 - 2025',
    level: 'Junior',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['TypeScript', 'Vue 3'],
  },
  {
    id: 'role-two',
    title: 'Full Stack Developer II',
    subtitle: 'DocNetwork',
    period: '2025 - Present',
    level: 'Mid-level',
    body: 'Ut enim ad minim veniam, quis nostrud exercitation.',
  },
] as const

function mountChain() {
  return mount(NodalChain, {
    props: { entries, label: 'Roles held at DocNetwork' },
  })
}

describe('NodalChain', () => {
  it('renders one labeled node per entry in an accessible list', () => {
    const wrapper = mountChain()
    const items = wrapper.findAll('ol[aria-label="Roles held at DocNetwork"] > li')

    expect(items).toHaveLength(entries.length)
    expect(items.map((item) => item.get('h3').text())).toEqual([
      'Full Stack Developer I',
      'Full Stack Developer II',
    ])

    wrapper.unmount()
  })

  it('renders subtitle, period, level, body, and tags for each entry', () => {
    const wrapper = mountChain()
    const [first, second] = wrapper.findAll('ol > li')

    expect(first?.text()).toContain('DocNetwork')
    expect(first?.text()).toContain('2024 - 2025')
    expect(first?.text()).toContain('Junior')
    expect(first?.text()).toContain(entries[0].body)
    expect(first?.text()).toContain('TypeScript')
    expect(first?.text()).toContain('Vue 3')

    expect(second?.text()).toContain('Mid-level')
    expect(second?.text()).toContain(entries[1].body)

    wrapper.unmount()
  })

  it('marks the spine, markers, and branches as decorative', () => {
    const wrapper = mountChain()

    // Two spine layers plus a marker and a branch connector per entry.
    expect(wrapper.findAll('[aria-hidden="true"]')).toHaveLength(entries.length * 2 + 2)

    wrapper.unmount()
  })
})
