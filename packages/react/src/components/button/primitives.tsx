import type { HTMLAttributes } from 'react'
import {
  button,
  buttonGroup,
  ButtonVariantProps,
  type ButtonGroupVariantProps,
} from 'styled-system/recipes'
import {
  CerberusProps,
  createCerberusPrimitive,
  type CerberusPrimitiveProps,
} from '../../system/index'

/**
 * This module contains the Button component primitives.
 * @module @cerberus-design/react/components/button/primitives
 */

const { withRecipe } = createCerberusPrimitive(button)
const { withRecipe: withGroupRecipe } = createCerberusPrimitive(buttonGroup)

/**
 * The root element of the Button component.
 */
export const ButtonRoot = withRecipe('button')
export type ButtonRootProps = CerberusProps<'button'> & ButtonVariantProps

const ButtonGroupEl = withGroupRecipe('div')
export type ButtonGroupProps = CerberusPrimitiveProps<
  HTMLAttributes<HTMLDivElement> & ButtonGroupVariantProps
>

/**
 * The ButtonGroup component is a wrapper that groups multiple Button
 * components together.
 */
export function ButtonGroup(props: ButtonGroupProps) {
  return <ButtonGroupEl {...props} />
}
