import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import AppHeader from '@/components/AppHeader.vue'

const routes = [
  { path: '/', component: { render: () => null } },
  { path: '/about', component: { render: () => null } },
  { path: '/projects', component: { render: () => null } },
]

async function mountHeader() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  await router.push('/')
  await router.isReady()

  return mount(AppHeader, {
    global: { plugins: [router] },
  })
}

describe('AppHeader', () => {
  it('exposes the primary navigation links', async () => {
    const wrapper = await mountHeader()

    const links = wrapper.findAll('nav[aria-label="Primary"] a')
    expect(links.map((link) => link.text())).toEqual(['Home', 'About', 'Projects'])

    wrapper.unmount()
  })

  it('toggles the mobile menu with an accessible button', async () => {
    const wrapper = await mountHeader()
    const button = wrapper.get('button[aria-controls="primary-navigation"]')

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(button.attributes('aria-label')).toBe('Open navigation menu')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(button.attributes('aria-label')).toBe('Close navigation menu')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })

  it('closes the mobile menu when Escape is pressed', async () => {
    const wrapper = await mountHeader()
    const button = wrapper.get('button[aria-controls="primary-navigation"]')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(button.attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })
})
