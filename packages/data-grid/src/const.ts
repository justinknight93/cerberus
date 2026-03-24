import { ThemeOptions } from './types'

export const SCOPE = 'data-grid'

export const DEFAULT_COL_H = 40

export const PARTS = {
  TOOLBAR: 'toolbar',
  ROOT: 'root',
  VIEWPORT: 'viewport',
  HEAD_CELL: 'head-cell',
  ROW: 'row',
  CELL: 'row-cell',
  FOOTER: 'footer',
}

// Pagination
export const DEFAULT_PAGE_IDX = 1 // based on Ark API
export const SM_PAGE_SIZE = 25
export const MD_PAGE_SIZE = 50
export const LG_PAGE_SIZE = 100

export const DEFAULT_PAGE_SIZES = [SM_PAGE_SIZE, MD_PAGE_SIZE, LG_PAGE_SIZE]

// Row sizing

export const XS = 'xs'
export const SM = 'sm'
export const MD = 'md'
export const LG = 'lg'
export const XL = 'xl'

export type RowSize = typeof XS | typeof SM | typeof MD | typeof LG | typeof XL

type RowSizeData = {
  items: RowSize[]
  results: Record<RowSize, number> // in pixels
}

export const ROW_SIZES: RowSizeData = {
  items: [XS, SM, MD, LG, XL],
  results: {
    [XS]: 32,
    [SM]: 40,
    [MD]: 48,
    [LG]: 56,
    [XL]: 64,
  },
}

export const DEFAULT_THEME: ThemeOptions = {
  border: '1px solid',
  borderColor: 'var(--cerberus-colors-page-border-initial)',
  rounded: 'var(--cerberus-radii-lg)',
  rowBgColor: 'var(--cerberus-colors-page-surface-100)',
  rowEvenBgColor: 'var(--cerberus-colors-page-surface-initial)',
  rowHoverBgColor: 'var(--cerberus-colors-page-surface-200)',
  headCellBgColor: 'var(--cerberus-colors-page-bg-initial)',
  headCellBorderBottomColor: 'var(--cerberus-colors-page-border-200)',
  gridCellBorderColor: 'var(--cerberus-colors-page-border-200)',
  gridCellPinnedBorderColor: 'var(--cerberus-colors-page-border-200)',
}
