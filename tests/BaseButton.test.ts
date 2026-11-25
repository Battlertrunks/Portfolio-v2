import { enableAutoUnmount, mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import { afterEach, describe, expect, it } from 'vitest';

import BaseButton from '@/components/BaseButton.vue';

enableAutoUnmount(afterEach);

const routes = [
  { path: '/', component: { render: () => null } },
  { path: '/projects', component: { render: () => null } },
];

/** Starts the router at home so the projects link has a destination. */
async function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });

  await router.push('/');
  await router.isReady();

  return router;
}

describe('BaseButton', () => {
  it('renders and focuses a button with the requested type and label', () => {
    const wrapper = mount(BaseButton, {
      attachTo: document.body,
      props: { type: 'submit' },
      slots: { default: 'Save' },
    });

    const button = wrapper.get('button');
    expect(button.attributes('type')).toBe('submit');
    expect(button.text()).toBe('Save');
    expect(button.classes()).toContain('bg-accent');
    wrapper.vm.focus();
    expect(document.activeElement).toBe(button.element);
  });

  it('renders and focuses a router link when a destination is provided', async () => {
    const router = await createTestRouter();

    const wrapper = mount(BaseButton, {
      attachTo: document.body,
      props: { to: '/projects' },
      slots: { default: 'Projects' },
      global: { plugins: [router] },
    });

    const link = wrapper.get('a');
    expect(link.attributes('href')).toBe('/projects');
    expect(wrapper.find('button').exists()).toBe(false);
    wrapper.vm.focus();
    expect(document.activeElement).toBe(link.element);
  });
});
