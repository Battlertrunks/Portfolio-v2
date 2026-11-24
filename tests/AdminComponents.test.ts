import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { h } from 'vue';

import AdminCollectionView from '@/components/admin/AdminCollectionView.vue';
import AdminEditorForm from '@/components/admin/AdminEditorForm.vue';
import AdminItemRow from '@/components/admin/AdminItemRow.vue';

enableAutoUnmount(afterEach);

beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close ??= function () {
    this.open = false;
  };
});

describe('AdminCollectionView', () => {
  it('filters rows, shows counts and empty states, and emits add for the supplied item type', async () => {
    const items = [
      { id: '1', archived: false, name: 'Draft article' },
      { id: '2', archived: true, name: 'Old article' },
    ];
    const wrapper = mount(AdminCollectionView<(typeof items)[number]>, {
      props: {
        title: 'Manage articles',
        description: 'Review your articles.',
        itemLabel: 'article',
        itemsLabel: 'articles',
        items,
        showArchived: false,
        announcement: 'Draft article added.',
      },
      slots: {
        row: ({ item }) => h('li', item.name),
        editor: '<div>Article editor</div>',
      },
    });

    expect(wrapper.get('h1').text()).toBe('Manage articles');
    expect(wrapper.get('ul[aria-label="Active articles"]').text()).toBe('Draft article');
    const filters = wrapper.get('[aria-label="Filter articles"]');
    const active = filters.get('button:first-child');
    const archived = filters.get('button:last-child');
    expect(active.text()).toBe('Active 1');
    expect(archived.text()).toBe('Archived 1');
    expect(active.attributes('aria-pressed')).toBe('true');

    await archived.trigger('click');
    expect(wrapper.emitted('update:showArchived')).toEqual([[true]]);
    await wrapper.setProps({ showArchived: true });
    expect(archived.attributes('aria-pressed')).toBe('true');
    expect(wrapper.get('ul[aria-label="Archived articles"]').text()).toBe('Old article');

    await wrapper.setProps({ items: items.filter((item) => !item.archived) });
    expect(wrapper.text()).toContain('No archived articles.');
    expect(wrapper.get('[role="status"]').text()).toBe('Draft article added.');
    expect(wrapper.text()).toContain('Article editor');
    const add = wrapper.get('button[aria-haspopup="dialog"]');
    expect(add.text()).toContain('Add article');
    await add.trigger('click');
    expect(wrapper.emitted('add')).toHaveLength(1);
  });
});

describe('AdminItemRow', () => {
  it('expands slotted details and emits edit and archive actions', async () => {
    const wrapper = mount(AdminItemRow, {
      attachTo: document.body,
      props: { title: 'Release notes', itemLabel: 'article', archived: false },
      slots: { metadata: '<span>Published</span>', details: '<p>Release summary.</p>' },
    });
    const disclosure = wrapper.get('button[aria-expanded]');
    const details = wrapper.get(`#${disclosure.attributes('aria-controls')}`);
    expect(details.isVisible()).toBe(false);
    expect(wrapper.text()).toContain('Published');

    await disclosure.trigger('click');
    expect(disclosure.attributes('aria-expanded')).toBe('true');
    expect(details.isVisible()).toBe(true);
    expect(details.text()).toBe('Release summary.');

    await wrapper.get('[aria-label="Edit Release notes"]').trigger('click');
    await wrapper.get('[aria-label="Archive Release notes"]').trigger('click');
    expect(wrapper.emitted('edit')).toHaveLength(1);
    expect(wrapper.emitted('toggleArchive')).toHaveLength(1);

    await wrapper.setProps({ archived: true });
    await wrapper.get('[aria-label="Restore Release notes"]').trigger('click');
    expect(wrapper.emitted('toggleArchive')).toHaveLength(2);
  });

  it('focuses Cancel when asking for confirmation and deletes only after confirmation', async () => {
    const wrapper = mount(AdminItemRow, {
      attachTo: document.body,
      props: { title: 'Release notes', itemLabel: 'article', archived: false },
    });
    const remove = wrapper.get('[aria-label="Delete Release notes"]');
    await remove.trigger('click');
    expect(wrapper.text()).toContain('Delete “Release notes”?');
    expect(wrapper.emitted('delete')).toBeUndefined();
    const cancel = wrapper.findAll('button').find((button) => button.text() === 'Cancel')!;
    expect(document.activeElement).toBe(cancel.element);

    await cancel.trigger('click');
    expect(wrapper.text()).not.toContain('Delete “Release notes”?');
    expect(document.activeElement).toBe(remove.element);

    await remove.trigger('click');
    const confirm = wrapper.findAll('button').find((button) => button.text() === 'Delete article')!;
    await confirm.trigger('click');
    expect(wrapper.emitted('delete')).toHaveLength(1);
  });
});

describe('AdminEditorForm', () => {
  it('opens a labelled dialog, validates slotted fields, and emits submit and cancel', async () => {
    const wrapper = mount(AdminEditorForm, {
      attachTo: document.body,
      props: { title: 'Edit article', submitLabel: 'Save article' },
      slots: { default: '<label>Headline <input required /></label>' },
    });
    const dialog = wrapper.get<HTMLDialogElement>('dialog');
    const heading = wrapper.get(`#${dialog.attributes('aria-labelledby')}`);
    const submit = wrapper.get('button[type="submit"]');
    expect(dialog.element.open).toBe(true);
    expect(heading.text()).toBe('Edit article');
    expect(submit.text()).toBe('Save article');

    await submit.trigger('click');
    expect(wrapper.emitted('submit')).toBeUndefined();
    await wrapper.get('input').setValue('Release notes');
    await submit.trigger('click');
    expect(wrapper.emitted('submit')).toHaveLength(1);

    await wrapper.setProps({ error: 'Add a summary before saving.' });
    expect(wrapper.get('[role="alert"]').text()).toBe('Add a summary before saving.');

    const cancel = new Event('cancel', { cancelable: true });
    dialog.element.dispatchEvent(cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(wrapper.emitted('cancel')).toHaveLength(1);

    await wrapper.get('button[type="button"]').trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(2);
    wrapper.unmount();
    expect(dialog.element.open).toBe(false);
  });
});
