'use client'

import { Collapsible } from '@cerberus-design/react'
import { createQuery, useQuery, useSignal } from '@cerberus-design/signals'
import { Suspense, useRef, type PropsWithChildren, type ReactNode } from 'react'
import { Box, HStack, VStack } from 'styled-system/jsx'
import { CollapsibleCode } from './code-preview/collapsible-code'
import { CollapsibleProvider } from './code-preview/collapsible-provider.client'
import { getExampleCode } from './code-preview/helpers'
import { CopyButton } from './copy-button'

interface CodePreviewProps {
  id: string
  preview?: ReactNode | string
  context?: 'components' | 'data-grid'
}

export default function CodePreview(props: PropsWithChildren<CodePreviewProps>) {
  const [_, _set, getContent] = useSignal<CodePreviewProps>({
    id: props.id,
    preview: props.preview,
    context: props.context,
  })

  const ref = useRef(
    createQuery(getContent, async (content) => {
      const result = await getExampleCode(content.id, content.preview, content.context)
      return result
    }),
  )
  const data = useQuery(ref.current)

  if (!props.preview && props.id) {
    return <CollapsibleCode code={data.code} fallback={data.fallback} />
  }

  return (
    <VStack
      border="1px solid"
      borderColor="page.border.initial"
      gap="0"
      rounded="lg"
      shadow="md"
      w="full"
    >
      <Suspense>
        <HStack justify="center" py="md" w="full">
          {data.preview ?? props.preview}
        </HStack>
      </Suspense>

      <CollapsibleProvider>
        <Collapsible.Content pos="relative">
          <Box
            left="calc(100% - 2rem)"
            pos="sticky"
            top="8"
            w="fit-content"
            zIndex="sticky"
          >
            <CopyButton content={data.rawContent} />
          </Box>

          <CollapsibleCode code={data.code} fallback={data.fallback} />
        </Collapsible.Content>
      </CollapsibleProvider>
    </VStack>
  )
}
