import React, { useContext } from 'react'
import { Table, Card, Button } from 'antd'
import "antd/dist/antd.css"
import { Link } from 'react-router-dom'
import { Spinner } from '../common/common'
import { DeleteOutlined, HighlightOutlined, PlusOutlined, LinkOutlined } from "@ant-design/icons"

import { HirarkiContext } from './HirarkiProvider'


export default function HirarkiList() {
  const value = useContext(HirarkiContext)

  const columns = [
    {
      title: 'No.',
      key: 'index',
      width: '7%',
      render: (text, record, index) => value.pagination.number + index,
    },
    {
      title: 'Family Name',
      dataIndex: 'name',
      width: '40%',
      key: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'head',
      width: '40%',
      key: 'head',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'x',
      render: (id) => {
        return (
          <div style={{ display: 'flex' }}>
            <Link to={`/hirarki?action=detail&id=${id}`}>
              <LinkOutlined style={{ color: '#595959', fontSize: 20, marginRight: 10 }} />
            </Link>
            <Link to={`/hirarki?action=edit&id=${id}`} >
              <HighlightOutlined style={{ color: '#595959', fontSize: 20 }} />
            </Link>
            <div style={{ marginLeft: 10 }}>
              <DeleteOutlined style={{ fontSize: 20 }} />
            </div>
          </div>
        )
      }
    }
  ]

  return (
    <Spinner loading={value.loading}>
      <Card
        title={
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline'
          }}>
            <div style={{
              width: 6,
              height: 20,
              backgroundColor: '#d3211f',
              marginRight: 8,
            }} />
            <h2>Family Tree List</h2>
          </div>
        }
        extra={
          <Link to="/hirarki?action=add">
            <Button type='primary' danger>
              <PlusOutlined />
              Tambah
          </Button>
          </Link>
        }>
        <Table
          rowKey='id'
          dataSource={value.items || []}
          columns={columns}
          pagination={value.pagination}
          onChange={value._handleTableChange} />
      </Card>
    </Spinner>
  )
}