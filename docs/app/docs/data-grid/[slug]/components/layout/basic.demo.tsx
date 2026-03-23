'use client'

import { DecorativeBox } from '@/app/components/decorative-box'
import { Stack } from '@/styled-system/jsx'
import { DataGrid } from '@cerberus-design/data-grid'
import { columns } from '../quick-start/columns.demo'
import { useFakeQuery } from '../quick-start/data'

export function BasicDemo() {
  // Normally this would be from useQuery or a server-side API call
  const data = useFakeQuery(100)

  return (
    <Stack direction="column" gap="md" h="25rem" mb="md" w="90%">
      <DataGrid columns={columns} data={data} toolbar={<Toolbar />} footer={<Footer />} />
    </Stack>
  )
}

function Toolbar() {
  return <DecorativeBox h="50px">Toolbar</DecorativeBox>
}

function Footer() {
  return <DecorativeBox h="50px">Footer</DecorativeBox>
}
