import React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Оператор',
    dataIndex: 'full_name',
  },
  {
    title: 'Принятые (балл)',
    dataIndex: 'created_score',
  },
  {
    title: 'Количество',
    dataIndex: 'created_quantity',
  },

  {
    title: 'Обработанные (балл)',
    dataIndex: 'updated_score',
  },
  {
    title: 'Количество',
    dataIndex: 'updated_quantity',
  },
  {
    title: 'Закрытые (балл) ',
    dataIndex: 'closed_score',
  },
  {
    title: 'Количество',
    dataIndex: 'closed_quantity',
  },
  {
    title: 'Итого баллов',
    dataIndex: 'total_employee_score',
  },
  {
    title: 'Общее количество',
    dataIndex: 'total_employee_quantity',
  },
  {
    title: 'Процент балла',
    dataIndex: 'employee_percent_score',
  },
  {
    title: 'Оплата',
    dataIndex: 'salary',
  },
]

const showHeader = true
const footer = () => 'Here is footer'
const pagination = { position: 'none' }

export default class CallCenterTable extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'small',
    // size: 'midle',
    showHeader,
    footer,
    scroll: undefined,
  }
  render() {
    const { ccData } = this.props
    const pageSizeOptions = ['10', '100', '250', '500']
    return (
      <div>
        <Table
          {...this.state}
          columns={columns}
          bordered
          dataSource={ccData}
          rowKey="id"
          rowClassName="rows-color"
          // loading={isLoadingTable}
          footer={() => ''}
          pagination={{ showSizeChanger: true, pageSizeOptions, pageSize: 250 }}
        />
      </div>
    )
  }
}
