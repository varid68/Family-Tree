import React from 'react'
import { queryString } from '../common/common'
import HirarkiProvider from './HirarkiProvider'
import HirakiList from './HirarkiList'
import HirarkiAdd from './HirarkiAdd'
import HirarkiEdit from './HirarkiEdit'

const HirarkiIndex = props => {
  const { action, id } = queryString(props.location.search)

  const renderComponent = () => {
    switch (action) {
      case 'add':
        return <HirarkiAdd />

      case 'edit':
        return <HirarkiEdit />

      default:
        return <HirakiList />
    }
  }

  return <HirarkiProvider>{renderComponent()}</HirarkiProvider>
}

export default HirarkiIndex
