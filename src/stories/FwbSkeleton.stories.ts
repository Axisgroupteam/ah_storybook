import type { Meta, StoryObj } from '@storybook/vue3'
import FwbSkeleton from '@/components/FwbSkeleton/FwbSkeleton.vue'
import LoadingDefault from '@/components/FwbSkeleton/components/LoadingDefault.vue'
import LoadingImage from '@/components/FwbSkeleton/components/LoadingImage.vue'
import LoadingVideo from '@/components/FwbSkeleton/components/LoadingVideo.vue'
import LoadingText from '@/components/FwbSkeleton/components/LoadingText.vue'
import LoadingCard from '@/components/FwbSkeleton/components/LoadingCard.vue'
import LoadingWidget from '@/components/FwbSkeleton/components/LoadingWidget.vue'
import LoadingList from '@/components/FwbSkeleton/components/LoadingList.vue'
import LoadingTestimonial from '@/components/FwbSkeleton/components/LoadingTestimonial.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories

/**
 * The skeleton component can be used as an alternative loading indicator to the spinner by mimicking the content that will be loaded such as text, images, or video.
 *
 * Use the skeleton component to indicate a loading status with placeholder elements that look very similar to the type of content that is being loaded such as paragraphs, heading, images, videos, and more.
 */
const meta = {
  title: 'Example/SkeletonX',
  component: FwbSkeleton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    // moduleData: object
  },

  args: {}
} satisfies Meta<typeof FwbSkeleton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use this example to show a placeholder when loading text content.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingDefault },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-default />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * This example can be used to show a placeholder when loading an image.
 */
export const Image: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingImage },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-image />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * Use this example to show a skeleton placeholder when loading video content.
 */
export const Video: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingVideo },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-video />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * Use this example to show a placeholder when loading longer paragraphs and headings.
 */
export const Text: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingText },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-text />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * Use this example to show a placeholder when loading content inside a card.
 */
export const Card: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingCard },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-card />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * This example can be used to show a placeholder of skeleton when fetching data for widgets and cards inside an application.
 */
export const Widget: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingWidget },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-widget />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * Use this example to show a placeholder when loading a list of items.
 */
export const List: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingList },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-list />
            </fwb-skeleton>
        `
  }),
  args: {}
}

/**
 * This example can be used to show a skeleton placeholder when loading data for a testimonial section.
 */
export const Testimonial: Story = {
  render: (args) => ({
    components: { FwbSkeleton, LoadingTestimonial },
    setup() {
      // return {}
    },
    template: `            
            <fwb-skeleton>
                <loading-testimonial />
            </fwb-skeleton>
        `
  }),
  args: {}
}
