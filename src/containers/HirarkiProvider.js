import React, { createContext, useState, useEffect } from 'react'

export const HirarkiContext = createContext()

export default function HirarkiProvider(props) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('fetch')
  }, [])


  const _fetch = () => {

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
          _fetch,
          _validate,
          _onDelete
        }}>
        {props.children}
      </HirarkiContext.Provider>
    </React.Fragment>
  )
}