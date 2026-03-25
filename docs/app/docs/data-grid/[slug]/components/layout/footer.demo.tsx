'use client'

import { DataGrid, useDataGridContext } from '@cerberus-design/data-grid'
import { useRead } from '@cerberus-design/signals'
import { HStack, Stack } from 'styled-system/jsx'
import { columns } from '../quick-start/columns.demo'
import { createFakeQuery } from '../quick-start/data'
import { type Employee } from '../quick-start/data.demo'

export function FooterDemo() {
  // Normally this would be from useQuery or a server-side API call
  const data = createFakeQuery(200)

  return (
    <Stack direction="column" gap="md" h="25rem" mb="md" w="90%">
      <DataGrid columns={columns} data={data()} footer={<Footer />} />
    </Stack>
  )
}

function Footer() {
  const store = useDataGridContext<Employee>()
  const totalCount = useRead(store.rowCount)
  return <HStack w="full">This table has {totalCount} rows</HStack>
}
