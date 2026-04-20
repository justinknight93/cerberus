export const DEMOS = {
  vite: `import { defineConfig } from 'vitest/config'

export default defineConfig({
  // ...
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup-test.ts',
  },
})`,
  setup: `import '@testing-library/jest-dom/vitest'
  import { JSDOM } from 'jsdom'
  import ResizeObserver from 'resize-observer-polyfill'
  import { vi } from 'vitest'
  import 'vitest-axe/extend-expect'

  const { window } = new JSDOM()

  // ResizeObserver mock
  vi.stubGlobal('ResizeObserver', ResizeObserver)
  window['ResizeObserver'] = ResizeObserver

  // IntersectionObserver mock
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  }))
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  window['IntersectionObserver'] = IntersectionObserverMock

  // Scroll Methods mock
  window.Element.prototype.scrollTo = () => {}
  window.Element.prototype.scrollIntoView = () => {}

  // requestAnimationFrame mock
  window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)

  // URL object mock
  window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
  window.URL.revokeObjectURL = () => {}

  // navigator mock
  Object.defineProperty(window, 'navigator', {
    value: {
      clipboard: {
        writeText: vi.fn(),
      },
    },
  })

  // Override globalThis
  Object.assign(global, { window, document: window.document })`,
  render: `import { render as rtlRender } from '@testing-library/react'
  import {
    CerberusProvider,
    defineIcons,
    makeSystemConfig,
    NotificationCenter,
  } from '@cerberus/react'

  const config = makeSystemConfig({
    icons: defineIcons({
      // Define your icons here
      // Example: "home": <svg>...</svg>
    }),
  })

  export function render(ui: ReactNode) {
    return rtlRender(<>{ui}</>, {
      wrapper: (props: PropsWithChildren) => (
        <CerberusProvider config={config}>
          {props.children}
          <NotificationCenter />
        </CerberusProvider>
      ),
    })
  }`,
  test: `import { Button } from '@cerberus/react'
  import { render } from './testing/render'

  test('renders a button', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })`,
}
