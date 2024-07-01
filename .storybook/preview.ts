import type { Preview } from '@storybook/vue3'
import '../src/assets/base.css'
import { withThemeByClassName } from '@storybook/addon-themes'
import { themes } from '@storybook/theming'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark
    },
    backgrounds: {
      values: [
        { name: 'ligth', value: '#fff' },
        { name: 'dark', value: '#262626' }
      ]
    },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

/* snipped for brevity */

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'light'
  }),
  (story) => ({
    components: { story },
    template: '<div style="background-color: var(--bg-color); padding: 24px"><story /></div>'
  })
]

export default preview
