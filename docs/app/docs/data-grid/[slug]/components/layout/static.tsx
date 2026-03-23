import { BasicDemo } from './basic.demo'
import { ToolbarDemo } from './toolbar.demo'
import { FooterDemo } from './footer.demo'

export const DEMOS = {
  basic: {
    id: 'layout.basic',
    preview: <BasicDemo />,
    context: 'data-grid',
  },
  toolbar: {
    id: 'layout.toolbar',
    preview: <ToolbarDemo />,
    context: 'data-grid',
  },
  footer: {
    id: 'layout.footer',
    preview: <FooterDemo />,
    context: 'data-grid',
  },
}
