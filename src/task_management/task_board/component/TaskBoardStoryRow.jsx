import React, { Fragment } from 'react'

import TaskBoardStoryCell from './TaskBoardStoryCell'
import TaskStatusCell from './TaskStatusCell'

export default ({ story }) => (
  <Fragment>
    <tr>
      <TaskBoardStoryCell story={story} />
      <TaskStatusCell statusOfCell="new" story={story} />
      <TaskStatusCell statusOfCell="running" story={story} />
      <TaskStatusCell statusOfCell="end" story={story} />
    </tr>
  </Fragment>
)