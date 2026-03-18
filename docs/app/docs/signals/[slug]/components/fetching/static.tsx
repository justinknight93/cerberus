import { BasicDemo } from './basic.demo'
import { MutationDemo } from './mutation.demo'

export const DEMOS = {
  basic: {
    id: 'fetching.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  mutation: {
    id: 'fetching.mutation',
    preview: <MutationDemo />,
    context: 'signals',
  },
}
