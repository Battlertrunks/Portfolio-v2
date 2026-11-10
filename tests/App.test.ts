import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import App from '@/App.vue'
import HomeView from '@/features/home/HomeView.vue'

async function mountApp() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', name: 'home', component: HomeView }],
  })

  await router.push('/')
  await router.isReady()

  return mount(App, {
    global: { plugins: [router] },
  })
}

describe('App', () => {
  it('renders the skip link, header, main content, and footer', async () => {
    const wrapper = await mountApp()

    expect(wrapper.get('a[href="#main-content"]').text()).toBe('Skip to content')
    expect(wrapper.get('main#main-content h1').text()).toContain("Hi, I'm Gavin")
    expect(wrapper.get('footer').text()).toContain('All rights reserved')

    wrapper.unmount()
  })
})
