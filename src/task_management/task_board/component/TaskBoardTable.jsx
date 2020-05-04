import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd'

import TaskBoardStoryRow from './TaskBoardStoryRow'
import Actions from '../taskBoardActions'

const TaskBoardTable = ({ stories, dispatch }) => {

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    const isUnvalidDrop = !destination ||
                         (destination.droppableId === source.droppableId
                           && destination.index === source.index)

    if (isUnvalidDrop) return
    
    const isStatusChanged = destination.droppableId !== source.droppableId
    if (isStatusChanged) {
      const [sprintId, storyId, newStatus] = destination.droppableId.split("#")
  
      dispatch(Actions.changeTaskStatus({ sprintId,
                                          storyId,
                                          taskId: draggableId,
                                          newStatus,
                                          newIndex: destination.index }))
      
      return
    }

    const isSortOrderChanged = destination.index !== source.index
    if (isSortOrderChanged) {
      const [sprintId, storyId] = destination.droppableId.split("#")

      dispatch(Actions.changeSortOrder({ sprintId,
                                         storyId,
                                         taskId: draggableId,
                                         newIndex: destination.index }))

      return
    }
  }

  return (
    <Fragment>
      <table style={{ marginTop: "10px", border: "1px solid #dee2e6", width: "100%", marginBottom: "1rem", color: "#212529", borderCollapse:"collapse" }}>
        <thead style={{backgroundColor: "#e9ecef", border: "1px solid #dee2e6"}}>
          <tr>
            <th style={{ width: "13%", padding: ".75rem", border: "1px solid #dee2e6" }}>ストーリー</th>
            <th style={{ width: "29%", padding: ".75rem", border: "1px solid #dee2e6" }}>タスク</th>
            <th style={{ width: "29%", padding: ".75rem", border: "1px solid #dee2e6" }}>進行中</th>
            <th style={{ width: "29%", padding: ".75rem", border: "1px solid #dee2e6" }}>完了</th>
          </tr>
        </thead>
        <tbody>
          <DragDropContext onDragEnd={onDragEnd}>
            {stories ?
              Array.from(stories.values())
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(story => (
                  <TaskBoardStoryRow story={story} key={story.id} />
                ))
              : null}
          </DragDropContext>
        </tbody>
      </table>
    </Fragment>
  )
}

export default connect()(TaskBoardTable)
