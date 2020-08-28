import React, { useState, createContext, useEffect } from 'react'

export const ServiceTypeContext = createContext()

export const ServiceTypeProvider = ({ children }) => {
  const [serviceType, setServiceType] = useState('')
  useEffect(()=> {
    console.log(serviceType)
  }, [serviceType])
  return (<ServiceTypeContext.Provider value={[serviceType, setServiceType]} >
    {children}
  </ServiceTypeContext.Provider>)
}
