import { BasicDemo } from './basic.demo'
import { GlobalDemo } from './global.demo'
import { PureDemo } from './pure.demo'
import { LocalDemo } from './local.demo'

export const DEMOS = {
  basic: {
    id: 'store.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  global: {
    id: 'store.global',
    preview: <GlobalDemo />,
    context: 'signals',
  },
  pure: {
    id: 'store.pure',
    preview: <PureDemo />,
    context: 'signals',
  },
  local: {
    id: 'store.local',
    preview: <LocalDemo />,
    context: 'signals',
  },
  meta: `import { createStoreContext } from '@cerberus/signals'`,
}
