import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProjectMediaGrid from '@/components/ProjectMediaGrid.vue'
import type { ProjectMedia } from '@/types'

const images: readonly ProjectMedia[] = Array.from({ length: 5 }, (_, index) => ({
  type: 'image' as const,
  src: `/image-${index + 1}.svg`,
  alt: `Image ${index + 1}`,
}))

describe('ProjectMediaGrid', () => {
  it('renders at most four media items', () => {
    const wrapper = mount(ProjectMediaGrid, {
      props: { media: images },
    })

    expect(wrapper.findAll('img')).toHaveLength(4)
  })

  it('renders videos with controls, a poster, and an accessible label', () => {
    const wrapper = mount(ProjectMediaGrid, {
      props: {
        media: [
          {
            type: 'video',
            src: '/walkthrough.mp4',
            poster: '/walkthrough-poster.svg',
            label: 'Project walkthrough',
          },
        ],
      },
    })

    const video = wrapper.get('video')
    expect(video.attributes('src')).toBe('/walkthrough.mp4')
    expect(video.attributes('poster')).toBe('/walkthrough-poster.svg')
    expect(video.attributes('aria-label')).toBe('Project walkthrough')
    expect(video.attributes()).toHaveProperty('controls')
  })

  it('uses the three-item collage layout with a full-height first item', () => {
    const wrapper = mount(ProjectMediaGrid, {
      props: { media: images.slice(0, 3) },
    })

    expect(wrapper.get('.grid').classes()).toContain('grid-cols-2')
    expect(wrapper.get('.grid').classes()).toContain('grid-rows-2')
    expect(wrapper.findAll('.grid > div')[0]?.classes()).toContain('row-span-2')
  })
})
