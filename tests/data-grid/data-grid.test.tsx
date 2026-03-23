import { describe, test, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { DataGrid, createColumnHelper } from '@cerberus-design/data-grid'
import { CerberusProvider } from '@cerberus-design/react'

describe('DataGrid', () => {
  const data = [
    {
      one: 'one',
      two: 'two',
      three: 'three',
    },
  ]
  type Row = (typeof data)[0]

  const helper = createColumnHelper<Row>()

  const columns = [
    helper.display({
      id: 'one',
      header: 'Display',
      cell: () => <>static content</>,
    }),
    helper.accessor('two', {
      header: 'Second',
    }),
    helper.accessorFn((row) => row.three, {
      header: 'Third',
      id: 'three',
    }),
  ]

  test('renders without crashing', () => {
    render(
      <CerberusProvider>
        <DataGrid data={data} columns={columns} />
      </CerberusProvider>,
    )
    expect(screen.getByText('Display')).toBeInTheDocument()
    expect(screen.getByText('static content')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('two')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
    expect(screen.getByText('three')).toBeInTheDocument()
  })

  test('renders a toolbar', () => {
    function Toolbar() {
      return <div>This is a toolbar</div>
    }
    render(
      <CerberusProvider>
        <DataGrid data={data} columns={columns} toolbar={<Toolbar />} />
      </CerberusProvider>,
    )
    expect(screen.getByText('This is a toolbar')).toBeInTheDocument()
  })

  test('renders footer', () => {
    function Footer() {
      return <div>This is a footer</div>
    }
    render(
      <CerberusProvider>
        <DataGrid data={data} columns={columns} footer={<Footer />} />
      </CerberusProvider>,
    )
    expect(screen.getByText('This is a footer')).toBeInTheDocument()
  })
})
