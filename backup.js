import React, { useState, Fragment } from "react"
import { Row, Col, Input, Form, Space, Table, Button, Select, message } from "antd"
import _ from "lodash"
import "antd/dist/antd.css"
import { FormOutlined, DeleteOutlined, ApartmentOutlined, AppstoreOutlined } from "@ant-design/icons"
import { insertData } from './common/axios'
import Graph from "./Chart"

const { Option } = Select


function App() {
  const [fields, setFields] = useState({
    hirarki_name: '',
    head: '',
    data: []
  })
  const [child, setChild] = useState({
    id: "",
    name: "",
    couple: "",
    parent: "",
    address: ""
  })
  const [viewTable, setViewTable] = useState(true)
  const [viewInputHirarki, setViewInputHiraki] = useState(true)

  const columns = [
    {
      title: "No.",
      dataIndex: "",
      width: "5%",
      render: (val, e, index) => (<span>{index + 1}</span>)
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>,
    },
    {
      title: "Couple",
      dataIndex: "couple",
      key: "couple",
      render: val => (<span>{val < 1 ? "-" : val}</span>)
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: val => (<span>{val}</span>)
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <Space size="middle">
          <FormOutlined />
          <DeleteOutlined onClick={_deleteChild.bind(null, id)} />
        </Space>
      ),
    },
  ]

  const _addHiraki = (flag) => {
    let _fields = { ...fields }

    if (flag === 'add') {
      _fields.data = _fields.data.concat([
        {
          id: 0,
          name: _.startCase(_.toLower(fields.head)),
          couple: '-',
          parent: '',
          address: ''
        }
      ])
    } else {

    }

    setFields(_fields)
    setViewInputHiraki(!viewInputHirarki)
  }

  const _addChild = () => {
    let _child = { ...child }
    let _fields = { ...fields }

    _child["id"] = Math.floor(Math.random() * 1000) + 1
    Object.keys(_child).forEach((key) => _child[key] = _.startCase(_.toLower(_child[key])))

    _fields.data = _fields.data.concat([_child])

    if (_child.parent === "") {
      message.warning("Nama Orang Tua Tidak Boleh Kosong!")
      return false
    }

    setFields(_fields)
    setChild({ id: "", name: "", couple: "", parent: "" })
  }

  const _deleteChild = (id) => {
    let _fields = { ...fields }

    const result = _fields.data.filter(item => item.id !== id)
    setFields(result)
  }


  const _onChange = (e, name) => {
    let _child = { ...child }
    let _fields = { ...fields }

    if (name === 'hirarki_name' || name === 'head') {
      _fields[name] = e.target.value
      setFields(_fields)
    } else {
      _child[name] = name === "parent" ? e : e.target.value
      setChild(_child)
    }
  }

  const _send = () => {
    let _fields = { ...fields }
    const data = _fields.data.filter(e => e.id > 0)
    _fields.data = data


    if (_fields.hirarki_name === '') {
      message.warning('Nama Hirarki tidak boleh kosong')
      return
    }

    if (_fields.head === '') {
      message.warning('Nama Kepala keluarga tidak boleh kosong')
      return
    }

    if (_fields.data.length < 1) {
      message.warning('Tabel tidak boleh kosong')
      return
    }

    _fields.hirarki_id = Number(_fields.data[0].id)

    insertData('http://127.0.0.1:3333/v1/hirarkis', _fields)
      .then(res => console.log(res))
      .catch(() => console.log('err'))

    console.log(_fields)
  }


  return (
    <div style={{ padding: 50 }}>
      <Form layout="vertical">
        {
          viewInputHirarki ?
            <Row gutter={[30, 5]} type="flex" align="middle">
              <Col sm={5} >
                <Form.Item label="Nama Hirarki">
                  <Input
                    value={fields.hirarki_name}
                    onChange={e => _onChange(e, "hirarki_name")}
                    placeholder="Masukkan nama hiraki" />
                </Form.Item>
              </Col>
              <Col sm={5} >
                <Form.Item label="Nama Kepala Keluarga">
                  <Input
                    value={fields.head}
                    onChange={e => _onChange(e, "head")}
                    placeholder="Masukkan nama kepala keluarga" />
                </Form.Item>
              </Col>
              <Col sm={3} >
                <Button type="primary" block onClick={_addHiraki.bind(null, 'add')}>Tambahkan</Button>
              </Col>
            </Row>
            :
            <Fragment>
              <Row gutter={[10, 10]}>
                <Col sm={5}>
                  <h3>Nama Hiraki</h3>
                </Col>
                <Col sm={5}>
                  <h3>: {_.startCase(_.toLower(fields.hirarki_name))}</h3>
                </Col>
                <Col sm={5} >
                  <Button type="primary" block onClick={_addHiraki.bind(null, 'edit')}>Edit Hiraki</Button>
                </Col>
              </Row>
              <Row gutter={[10, 10]} style={{ marginBottom: 40 }}>
                <Col sm={5}>
                  <h3>Nama Kepala Keluarga</h3>
                </Col>
                <Col>
                  <h3>: {_.startCase(_.toLower(fields.head))}</h3>
                </Col>
              </Row>
            </Fragment>
        }

        <Row gutter={[30, 5]} type="flex" align="middle">
          <Col sm={5} >
            <Form.Item label="Nama Anak">
              <Input
                disabled={viewInputHirarki}
                value={child.name}
                onChange={e => _onChange(e, "name")}
                placeholder="Masukkan nama anak kandung" />
            </Form.Item>
          </Col>
          <Col sm={5} >
            <Form.Item label="Nama Pasangan">
              <Input
                disabled={viewInputHirarki}
                value={child.couple}
                onChange={e => _onChange(e, "couple")}
                placeholder="Masukkan nama pasangan" />
            </Form.Item>
          </Col>
          <Col sm={6} >
            <Form.Item label="Alamat (kecamatan, kota)">
              <Input
                disabled={viewInputHirarki}
                value={child.address}
                onChange={e => _onChange(e, "address")}
                placeholder="Masukkan alamat" />
            </Form.Item>
          </Col>
          <Col sm={5}>
            <Form.Item label="Nama Orang Tua">
              <Select
                disabled={viewInputHirarki}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih nama orang tua"
                optionFilterProp="children"
                value={child.parent}
                onChange={e => _onChange(e, "parent")}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {
                  fields.data.map((item, i) => (
                    <Option key={i} value={item.name}>{item.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col sm={3}>
            <Button type="primary"
              disabled={viewInputHirarki}
              block onClick={_addChild}>Tambahkan</Button>
          </Col>
        </Row>
      </Form>

      <div style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 20
      }}>
        <h3 style={{ flex: 1 }}>SUMMARY</h3>
        {viewTable ? <ApartmentOutlined onClick={() => setViewTable(!viewTable)} style={{ fontSize: 20 }} /> : <AppstoreOutlined onClick={() => setViewTable(!viewTable)} style={{ fontSize: 20 }} />}
      </div>

      {
        viewTable ?
          <Table
            rowKey="id"
            pagination={false}
            columns={columns}
            dataSource={fields.data.filter(e => e.id > 0)} />
          :
          <Graph nodes={fields.data} />
      }

      <Row type='flex' justify='end' style={{ marginTop: 30 }}>
        <Col sm={3}>
          <Button type='danger' block onClick={_send}>Simpan</Button>
        </Col>
      </Row>
    </div>
  )
}

export default App
