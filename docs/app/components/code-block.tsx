'use client'

import { Terminal } from '@carbon/icons-react'
import { Show } from '@cerberus-design/react'
import { createQuery, useQuery, useSignal } from '@cerberus-design/signals'
import { useRef } from 'react'
import { css } from 'styled-system/css'
import { cerberus, HStack } from 'styled-system/jsx'
import { getCodeString } from './code-preview/helpers'
import { CopyButton } from './copy-button'

interface CodeBlockProps {
  content: string
  language?: string
}

export function CodeBlock(props: CodeBlockProps) {
  const [_, _set, getContent] = useSignal<string>(props.content)

  const ref = useRef(
    createQuery(getContent, async (content) => {
      const result = await getCodeString(content)
      return result
    }),
  )
  const data = useQuery(ref.current)

  return (
    <cerberus.div my="md">
      <Show when={props.language === 'sh'}>
        <HStack justify="space-between" w="full">
          <HStack textStyle="body-sm">
            <span
              className={css({
                color: 'page.text.100',
              })}
            >
              <Terminal />
            </span>
            Terminal
          </HStack>
          <CopyButton content={props.content} />
        </HStack>
      </Show>

      <cerberus.div dangerouslySetInnerHTML={{ __html: data }} />
    </cerberus.div>
  )
}
