import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from "@ant-design/icons"
import qs from 'qs'

const queryString = (params) => {
  return qs.parse(params, {
    ignoreQueryPrefix: true
  })
}


const Spinner = props => (
  <Spin indicator={<LoadingOutlined />} spinning={props.loading}>
    {props.children}
  </Spin>
)


export { queryString, Spinner }
