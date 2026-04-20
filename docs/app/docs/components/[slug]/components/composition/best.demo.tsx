import { Box, type BoxProps } from '@/styled-system/jsx'
import { Button } from '@cerberus-design/react'
import { forwardRef, PropsWithChildren } from 'react'

// React 18
const MyComponent = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <Box ref={ref} {...props} />
})

// React 19
function My19Component(props: PropsWithChildren<BoxProps>) {
  return <Box {...props} ref={props.ref} />
}

export function MyFeature() {
  return (
    <>
      <Button asChild>
        <MyComponent> Click me </MyComponent>
      </Button>

      <Button asChild>
        <My19Component> Click me </My19Component>
      </Button>
    </>
  )
}
