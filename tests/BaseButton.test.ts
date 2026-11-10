import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import BaseButton from '@/components/BaseButton.vue'

const routes = [
  { path: '/', component: { render: () => null } },
  { path: '/projects', component: { render: () => null } },
]

async function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  await router.push('/')
  await router.isReady()

  return router
}

describe('BaseButton', () => {
  it('renders a button with the requested type and label', () => {
    const wrapper = mount(BaseButton, {
      props: { type: 'submit' },
      slots: { default: 'Save' },
    })

    const button = wrapper.get('button')
    expect(button.attributes('type')).toBe('submit')
    expect(button.text()).toBe('Save')
    expect(button.classes()).toContain('bg-accent')
  })

  it('renders a router link when a destination is provided', async () => {
    const router = await createTestRouter()

    const wrapper = mount(BaseButton, {
      props: { to: '/projects' },
      slots: { default: 'Projects' },
      global: { plugins: [router] },
    })

    expect(wrapper.get('a').attributes('href')).toBe('/projects')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
