import React from 'react'
import { Spin } from 'antd'

export default () => (
  <div style={{width: "100%", marginTop: "10px", textAlign: "center", padding: "100px", backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    <Spin tip="Loading..." size="large"/>
  </div>
)