import { BasicDemo } from './basic.demo'
import { AttachedDemo } from './attached.demo'
import { GrowDemo } from './grow.demo'
import { OrientationDemo } from './orientation.demo'
import { StackDemo } from './stack.demo'

export const DEMOS = {
  basic: {
    id: 'group.basic',
    preview: <BasicDemo />,
  },
  attached: {
    id: 'group.attached',
    preview: <AttachedDemo />,
  },
  grow: {
    id: 'group.grow',
    preview: <GrowDemo />,
  },
  orientation: {
    id: 'group.orientation',
    preview: <OrientationDemo />,
  },
  stack: {
    id: 'group.stack',
    preview: <StackDemo />,
  },
  meta: `import { Group } from '@cerberus/react'`,
}
