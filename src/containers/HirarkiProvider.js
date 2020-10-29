import React, { createContext, useState, useEffect } from 'react'
import { message } from 'antd'
import { getListData } from '../common/axios'
import _ from 'lodash'

export const HirarkiContext = createContext()

export default function HirarkiProvider(props) {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    number: 1,
    offset: 0,
    search: '',
    total: 0
  })
  const [total, setTotal] = useState(0)

  useEffect(() => {
    _fetch({ offset: 0 })
  }, [])

  useEffect(() => {
    setPagination({ ...pagination, total })
  }, [total])

  const _fetch = (param = {}) => {
    const params = {
      ...param,
      sortby: 'id',
      order: 'asc',
      limit: 10
    }

    getListData('http://127.0.0.1:3333/v1/hirarkis', params)
      .then(res => {
        setTotal(res.count)
        setItems(res.payload)
        setLoading(false)
      })
      .catch(e => message.warning(e))
  }

  const _handleTableChange = (pager) => {
    pager.number = pager.current * pager.pageSize - (pager.pageSize - 1)
    pager['offset'] = pager.current * pager.pageSize - pager.pageSize

    setPagination(pager)
    _fetch({ offset: pager['offset'] })
  }

  const _validate = () => {
    _onSubmit()
  }

  const _onSubmit = () => {

  }

  const _onDelete = () => {

  }


  return (
    <React.Fragment>
      <HirarkiContext.Provider
        value={{
          loading,
          items,
          pagination,
          _fetch,
          _validate,
          _onDelete,
          _handleTableChange
        }}>
        {props.children}
      </HirarkiContext.Provider>
    </React.Fragment>
  )
}