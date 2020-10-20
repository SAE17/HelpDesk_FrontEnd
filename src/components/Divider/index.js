import React from 'react'
import { Divider } from '@material-ui/core'
export default function MyDivider({ label, ...props }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.1fr 10fr',
        gridTemplateRows: '1fr',
        gridGap: '0.5vw',
      }}
    >
      <span style={{ fontWeight: 700 }}>{label}</span>
      <Divider style={{ marginTop: '0.8em' }} />
    </div>
  )
}
