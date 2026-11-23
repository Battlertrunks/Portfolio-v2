import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import AdminView from '@/features/admin/AdminView.vue';
import { projects } from '@/features/projects/projects.data';

const portfolio = projects[0]!;

enableAutoUnmount(afterEach);

beforeAll(() => {
  // jsdom does not implement the native dialog lifecycle.
  HTMLDialogElement.prototype.showModal ??= function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close ??= function () {
    this.open = false;
  };
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('AdminView', () => {
  it('shows the project list with compact details and project controls', async () => {
    const wrapper = mount(AdminView);
    const list = wrapper.get('ul[aria-label="Active projects"]');
    const rows = list.findAll('h2 button');

    expect(rows.map((row) => row.text())).toEqual(projects.map((project) => project.title));
    expect(wrapper.get('button[aria-label="Edit Portfolio V2"]').text()).toBe('Edit');
    expect(wrapper.get('button[aria-label="Archive Portfolio V2"]').text()).toBe('Archive');
    expect(wrapper.get('button[aria-label="Delete Portfolio V2"]').text()).toBe('Delete');
    expect(wrapper.get('button[aria-haspopup="dialog"]:not([aria-label])').text()).toContain(
      'Add project',
    );

    const disclosure = list.get('h2 button');
    const details = wrapper.get<HTMLElement>(`#${disclosure.attributes('aria-controls')}`);
    expect(disclosure.attributes('aria-expanded')).toBe('false');
    expect(details.element.style.display).toBe('none');

    await disclosure.trigger('click');

    expect(disclosure.attributes('aria-expanded')).toBe('true');
    expect(details.element.style.display).toBe('');
    expect(details.text()).toContain(portfolio.description);
    expect(details.text()).toContain('Vue 3');
    expect(details.text()).toContain('4 attachments');
  });

  it('validates and saves a project with its timeline, status, tags, and description', async () => {
    const wrapper = mount(AdminView);
    await wrapper.get('button[aria-haspopup="dialog"]:not([aria-label])').trigger('click');

    const dialog = wrapper.get<HTMLDialogElement>('dialog');
    const form = dialog.get<HTMLFormElement>('form');
    expect(dialog.element.open).toBe(true);
    expect(dialog.get('h2').text()).toBe('Add project');
    expect(form.element.checkValidity()).toBe(false);

    await dialog.get('#project-title').setValue('  Service dashboard  ');
    await dialog.get('#project-timeline').setValue('May 2025 – Present');
    await dialog.get('#project-status').setValue('Shipped');
    await dialog.get('#project-tags').setValue(' Vue, Spring, Vue, , SQL ');
    await dialog.get('#project-description').setValue('Shows recent service health.');
    expect(form.element.checkValidity()).toBe(true);

    await form.trigger('submit');

    expect(wrapper.find('dialog').exists()).toBe(false);
    expect(wrapper.get('[role="status"]').text()).toBe('Service dashboard added.');
    const row = wrapper.get('ul[aria-label="Active projects"] > li:last-child');
    expect(row.text()).toContain('May 2025 – Present');
    expect(row.text()).toContain('Shipped');

    await row.get('h2 button').trigger('click');
    expect(row.text()).toContain('Shows recent service health.');
    expect(row.findAll('[aria-label="Tags"] li').map((tag) => tag.text())).toEqual([
      'Vue',
      'Spring',
      'SQL',
    ]);
  });

  it('prefills existing project fields and only applies edits when saved', async () => {
    const wrapper = mount(AdminView);
    const edit = wrapper.get('button[aria-label="Edit Portfolio V2"]');

    await edit.trigger('click');
    expect(wrapper.get('dialog h2').text()).toBe('Edit project');
    expect(wrapper.get<HTMLInputElement>('#project-title').element.value).toBe(portfolio.title);
    expect(wrapper.get<HTMLTextAreaElement>('#project-description').element.value).toBe(
      portfolio.description,
    );
    expect(wrapper.get<HTMLInputElement>('#project-tags').element.value).toBe(
      portfolio.tags.join(', '),
    );
    expect(wrapper.get<HTMLSelectElement>('#project-status').element.value).toBe(portfolio.status);
    const image = portfolio.media?.find((item) => item.type === 'image');
    expect(wrapper.get('dialog img').attributes('src')).toBe(image?.src);
    expect(wrapper.get('dialog img').attributes('alt')).toBe(image?.alt);

    await wrapper.get('#project-title').setValue('Discarded title');
    await wrapper.get('dialog').trigger('cancel');
    expect(wrapper.find('dialog').exists()).toBe(false);
    expect(wrapper.find('button[aria-label="Edit Portfolio V2"]').exists()).toBe(true);

    await edit.trigger('click');
    await wrapper.get('#project-title').setValue('Portfolio refresh');
    await wrapper.get('dialog form').trigger('submit');

    expect(wrapper.find('button[aria-label="Edit Portfolio refresh"]').exists()).toBe(true);
    expect(wrapper.get('[role="status"]').text()).toBe('Portfolio refresh updated.');
    expect(wrapper.get('ul[aria-label="Active projects"]').findAll('h2')).toHaveLength(
      projects.length,
    );
  });

  it('previews and retains local image and video files and can remove an attachment', async () => {
    const createObjectURL = vi.fn((file: File) => `blob:${file.name}`);
    const revokeObjectURL = vi.fn();
    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = createObjectURL;
        static revokeObjectURL = revokeObjectURL;
      },
    );
    const wrapper = mount(AdminView);
    await wrapper.get('button[aria-haspopup="dialog"]:not([aria-label])').trigger('click');

    const fileInput = wrapper.get<HTMLInputElement>('#project-media');
    expect(fileInput.attributes('accept')).toBe('image/*,video/*');
    expect(fileInput.element.multiple).toBe(true);
    Object.defineProperty(fileInput.element, 'files', {
      value: [
        new File(['image'], 'screen.png', { type: 'image/png' }),
        new File(['video'], 'demo.mp4', { type: 'video/mp4' }),
        new File(['text'], 'notes.txt', { type: 'text/plain' }),
      ],
    });
    await fileInput.trigger('change');

    expect(wrapper.get('[role="alert"]').text()).toBe('Choose image or video files.');
    expect(wrapper.get('dialog img').attributes('src')).toBe('blob:screen.png');
    expect(wrapper.get('dialog video').attributes('src')).toBe('blob:demo.mp4');
    expect(wrapper.get('dialog video').attributes('aria-label')).toBe('demo.mp4');
    expect(wrapper.get('#project-media-label-0').attributes('required')).toBeDefined();

    await wrapper.get('#project-title').setValue('Project with media');
    await wrapper.get('#project-description').setValue('A screenshot and video demo.');
    await wrapper.get('#project-media-label-0').setValue('Screenshot of the dashboard');
    await wrapper.get('dialog form').trigger('submit');

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:screen.png');
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:demo.mp4');

    await wrapper.get('button[aria-label="Edit Project with media"]').trigger('click');
    expect(wrapper.get('dialog img').attributes('alt')).toBe('Screenshot of the dashboard');
    expect(wrapper.get('dialog video').attributes('src')).toBe('blob:demo.mp4');

    await wrapper.get('button[aria-label="Remove attachment 2"]').trigger('click');
    await wrapper.get('dialog form').trigger('submit');
    await wrapper.get('button[aria-label="Edit Project with media"]').trigger('click');
    expect(wrapper.find('dialog video').exists()).toBe(false);
    expect(wrapper.get('dialog img').attributes('alt')).toBe('Screenshot of the dashboard');
  });

  it('archives, restores, and deletes a project after confirmation', async () => {
    const wrapper = mount(AdminView);
    const activeFilter = wrapper.get('[role="group"] button:first-child');
    const archiveFilter = wrapper.get('[role="group"] button:last-child');

    await wrapper.get('button[aria-label="Archive Portfolio V2"]').trigger('click');
    expect(wrapper.find('button[aria-label="Edit Portfolio V2"]').exists()).toBe(false);
    expect(archiveFilter.text()).toContain('1');

    await archiveFilter.trigger('click');
    expect(archiveFilter.attributes('aria-pressed')).toBe('true');
    const archived = wrapper.get('ul[aria-label="Archived projects"]');
    await archived.get('button[aria-label="Restore Portfolio V2"]').trigger('click');
    expect(wrapper.text()).toContain('No archived projects.');

    await activeFilter.trigger('click');
    await wrapper.get('button[aria-label="Delete Portfolio V2"]').trigger('click');
    expect(wrapper.text()).toContain('Delete “Portfolio V2”?');
    const cancel = wrapper.findAll('button').find((button) => button.text() === 'Cancel');
    expect(cancel).toBeDefined();
    await cancel!.trigger('click');
    expect(wrapper.text()).not.toContain('Delete “Portfolio V2”?');
    expect(wrapper.find('button[aria-label="Edit Portfolio V2"]').exists()).toBe(true);

    await wrapper.get('button[aria-label="Delete Portfolio V2"]').trigger('click');
    const confirm = wrapper.findAll('button').find((button) => button.text() === 'Delete project');
    expect(confirm).toBeDefined();
    await confirm!.trigger('click');
    expect(wrapper.find('button[aria-label="Edit Portfolio V2"]').exists()).toBe(false);
    expect(wrapper.get('[role="status"]').text()).toBe('Portfolio V2 deleted.');
  });
});
