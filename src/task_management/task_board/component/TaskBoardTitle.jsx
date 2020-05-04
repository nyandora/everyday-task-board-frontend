import React, {Fragment} from 'react'
import moment from 'moment'

export default ({sprint}) => (
  <Fragment>
    <div style={{position: "relative"}}>
      <h3 style={{ display: "inline" }}>{sprint.name}</h3>
      <span style={{position: "absolute", right: "0", bottom: "0"}}>
        {moment(sprint.startDate, "YYYYMMDD").format("YYYY/MM/DD")}
        &nbsp;〜&nbsp;
        {moment(sprint.endDate, "YYYYMMDD").format("YYYY/MM/DD")}
      </span>

    </div>
  </Fragment>
)
