import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbBadge from '@/components/FwbBadge/FwbBadge.vue'

const meta = {
  title: 'Example/FwbBadge',
  component: FwbBadge,

  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary'] }
  },
  args: {
    color: 'primary'
  }
} satisfies Meta<typeof FwbBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: 'primary'
  }
}

export const Constrast: Story = {
  args: {
    color: 'tertiary'
  }
}

export const DefaultSlot: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">
        <template #preffix><span class="inline-flex items-center justify-center w-4 h-4 rounded-full p-1 text-xs">3</span></template>        
        <template #default>Notifications</template>        
        <template #suffix>
          <button type="button" class="inline-flex items-center justify-center w-4 h-4 hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-1 text-xs">
            X
          </button>
        </template>        
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary'    
  }
}

export const PrefixSlots: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
        <template #preffix>
          <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 32 32" id="svg5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">

            <defs id="defs2"/>

              <g id="layer1" transform="translate(36.000001,-436)">

                <path d="m -28,456.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453669" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -26,453.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 6 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453653" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -23,450.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 3 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453635" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -29,443.01367 a 1,1 0 0 0 -1,1 v 1 h -1 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 1 v 1 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -1 h 1 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 h -1 v -1 a 1,1 0 0 0 -1,-1 z" id="path453629" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -29,440.01367 c -3.301857,0 -6.000001,2.69815 -6,6 -10e-7,1.76801 0.774349,3.36262 2,4.46289 v 11.53711 a 1.0001,1.0001 0 0 0 1,1 h 2.173828 c 0.415693,1.16039 1.530816,2 2.826172,2 1.295356,0 2.410479,-0.83961 2.826172,-2 H -17 h 2.173828 c 0.415693,1.16039 1.530816,2 2.826172,2 1.295356,0 2.4104792,-0.83961 2.8261719,-2 H -6 a 1.0001,1.0001 0 0 0 1,-1 v -7 a 1.0001,1.0001 0 0 0 -0.21875,-0.625 l -4,-5 A 1.0001,1.0001 0 0 0 -10,449.01367 h -6 v -2 a 1.0001,1.0001 0 0 0 -1,-1 h -6 c 1e-6,-3.30185 -2.698143,-6 -6,-6 z m 0,2 c 2.220979,0 4,1.77902 4,4 0,2.22098 -1.779021,4 -4,4 -0.84757,0 -1.630859,-0.25926 -2.275391,-0.70312 a 1,1 0 0 0 -0.267578,-0.20117 C -32.434453,448.37778 -33,447.26595 -33,446.01367 c 0,-2.22098 1.779021,-4 4,-4 z m 5.654297,6 H -18 v 13 h -6.173828 c -0.415693,-1.16039 -1.530816,-2 -2.826172,-2 -1.295356,0 -2.410479,0.83961 -2.826172,2 H -31 v -9.3457 c 0.626269,0.22297 1.29935,0.3457 2,0.3457 2.601207,0 4.826496,-1.67494 5.654297,-4 z m 7.345703,3 h 2 v 5 a 1.0001,1.0001 0 0 0 1,1 h 6 v 4 h -2.1738281 c -0.4156927,-1.16039 -1.5308159,-2 -2.8261719,-2 -1.295356,0 -2.410479,0.83961 -2.826172,2 H -16 Z m 4,0 h 1.519531 l 3.199219,4 H -12 Z m -15,10 c 0.564128,0 1,0.43587 1,1 0,0.56413 -0.435872,1 -1,1 -0.564128,0 -1,-0.43587 -1,-1 0,-0.56413 0.435872,-1 1,-1 z m 15,0 c 0.564128,0 1,0.43587 1,1 0,0.56413 -0.435872,1 -1,1 -0.564128,0 -1,-0.43587 -1,-1 0,-0.56413 0.435872,-1 1,-1 z" id="path453611" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

              </g>

            </svg>
        </template>        
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary'    
  }
}

export const SuffixSlot: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
        <template #suffix>
          <span>$</span>
        </template>        
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary'    
  }
}

export const Pill: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
        <template #default>
          <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 32 32" id="svg5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">

            <defs id="defs2"/>

              <g id="layer1" transform="translate(36.000001,-436)">

                <path d="m -28,456.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453669" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -26,453.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 6 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453653" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -23,450.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 3 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453635" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -29,443.01367 a 1,1 0 0 0 -1,1 v 1 h -1 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 1 v 1 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -1 h 1 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 h -1 v -1 a 1,1 0 0 0 -1,-1 z" id="path453629" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -29,440.01367 c -3.301857,0 -6.000001,2.69815 -6,6 -10e-7,1.76801 0.774349,3.36262 2,4.46289 v 11.53711 a 1.0001,1.0001 0 0 0 1,1 h 2.173828 c 0.415693,1.16039 1.530816,2 2.826172,2 1.295356,0 2.410479,-0.83961 2.826172,-2 H -17 h 2.173828 c 0.415693,1.16039 1.530816,2 2.826172,2 1.295356,0 2.4104792,-0.83961 2.8261719,-2 H -6 a 1.0001,1.0001 0 0 0 1,-1 v -7 a 1.0001,1.0001 0 0 0 -0.21875,-0.625 l -4,-5 A 1.0001,1.0001 0 0 0 -10,449.01367 h -6 v -2 a 1.0001,1.0001 0 0 0 -1,-1 h -6 c 1e-6,-3.30185 -2.698143,-6 -6,-6 z m 0,2 c 2.220979,0 4,1.77902 4,4 0,2.22098 -1.779021,4 -4,4 -0.84757,0 -1.630859,-0.25926 -2.275391,-0.70312 a 1,1 0 0 0 -0.267578,-0.20117 C -32.434453,448.37778 -33,447.26595 -33,446.01367 c 0,-2.22098 1.779021,-4 4,-4 z m 5.654297,6 H -18 v 13 h -6.173828 c -0.415693,-1.16039 -1.530816,-2 -2.826172,-2 -1.295356,0 -2.410479,0.83961 -2.826172,2 H -31 v -9.3457 c 0.626269,0.22297 1.29935,0.3457 2,0.3457 2.601207,0 4.826496,-1.67494 5.654297,-4 z m 7.345703,3 h 2 v 5 a 1.0001,1.0001 0 0 0 1,1 h 6 v 4 h -2.1738281 c -0.4156927,-1.16039 -1.5308159,-2 -2.8261719,-2 -1.295356,0 -2.410479,0.83961 -2.826172,2 H -16 Z m 4,0 h 1.519531 l 3.199219,4 H -12 Z m -15,10 c 0.564128,0 1,0.43587 1,1 0,0.56413 -0.435872,1 -1,1 -0.564128,0 -1,-0.43587 -1,-1 0,-0.56413 0.435872,-1 1,-1 z m 15,0 c 0.564128,0 1,0.43587 1,1 0,0.56413 -0.435872,1 -1,1 -0.564128,0 -1,-0.43587 -1,-1 0,-0.56413 0.435872,-1 1,-1 z" id="path453611" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

              </g>

            </svg>
        </template>        
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    pill: true,
    square: true
  }
}

export const Square: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
        <template #default>
          <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 32 32" id="svg5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">

            <defs id="defs2"/>

              <g id="layer1" transform="translate(36.000001,-436)">

                <path d="m -28,456.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453669" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -26,453.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 6 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453653" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -23,450.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 3 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453635" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -29,443.01367 a 1,1 0 0 0 -1,1 v 1 h -1 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 1 v 1 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -1 h 1 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 h -1 v -1 a 1,1 0 0 0 -1,-1 z" id="path453629" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                <path d="m -29,440.01367 c -3.301857,0 -6.000001,2.69815 -6,6 -10e-7,1.76801 0.774349,3.36262 2,4.46289 v 11.53711 a 1.0001,1.0001 0 0 0 1,1 h 2.173828 c 0.415693,1.16039 1.530816,2 2.826172,2 1.295356,0 2.410479,-0.83961 2.826172,-2 H -17 h 2.173828 c 0.415693,1.16039 1.530816,2 2.826172,2 1.295356,0 2.4104792,-0.83961 2.8261719,-2 H -6 a 1.0001,1.0001 0 0 0 1,-1 v -7 a 1.0001,1.0001 0 0 0 -0.21875,-0.625 l -4,-5 A 1.0001,1.0001 0 0 0 -10,449.01367 h -6 v -2 a 1.0001,1.0001 0 0 0 -1,-1 h -6 c 1e-6,-3.30185 -2.698143,-6 -6,-6 z m 0,2 c 2.220979,0 4,1.77902 4,4 0,2.22098 -1.779021,4 -4,4 -0.84757,0 -1.630859,-0.25926 -2.275391,-0.70312 a 1,1 0 0 0 -0.267578,-0.20117 C -32.434453,448.37778 -33,447.26595 -33,446.01367 c 0,-2.22098 1.779021,-4 4,-4 z m 5.654297,6 H -18 v 13 h -6.173828 c -0.415693,-1.16039 -1.530816,-2 -2.826172,-2 -1.295356,0 -2.410479,0.83961 -2.826172,2 H -31 v -9.3457 c 0.626269,0.22297 1.29935,0.3457 2,0.3457 2.601207,0 4.826496,-1.67494 5.654297,-4 z m 7.345703,3 h 2 v 5 a 1.0001,1.0001 0 0 0 1,1 h 6 v 4 h -2.1738281 c -0.4156927,-1.16039 -1.5308159,-2 -2.8261719,-2 -1.295356,0 -2.410479,0.83961 -2.826172,2 H -16 Z m 4,0 h 1.519531 l 3.199219,4 H -12 Z m -15,10 c 0.564128,0 1,0.43587 1,1 0,0.56413 -0.435872,1 -1,1 -0.564128,0 -1,-0.43587 -1,-1 0,-0.56413 0.435872,-1 1,-1 z m 15,0 c 0.564128,0 1,0.43587 1,1 0,0.56413 -0.435872,1 -1,1 -0.564128,0 -1,-0.43587 -1,-1 0,-0.56413 0.435872,-1 1,-1 z" id="path453611" style="fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

              </g>

            </svg>
        </template>        
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    square: true
  }
}
