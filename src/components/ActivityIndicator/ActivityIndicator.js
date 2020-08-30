import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export const ActivityIndicator = () => {
  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      width: '100%',
      alignItem: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress color="secondary" size="5rem"/>
    </div>
  )
}
