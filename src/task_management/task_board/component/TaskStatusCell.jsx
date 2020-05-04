import React, { Fragment } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Task from './Task'

export default ({ statusOfCell, story }) => (
  <Fragment> 
    <Droppable
      droppableId={story.baseSprintId + "#" + story.id + "#" + statusOfCell}
      direction="horizontal">
      
      {provided => (
        <td 
          style={{padding: ".75rem", border: "1px solid #dee2e6", verticalAlign: "top" }}
          ref={provided.innerRef}
          {...provided.droppableProps}>
            {story.tasks ?
            <div style={{display: "flex", flexWrap: "wrap"}}>
              {Array.from(story.tasks.values())
                .filter(task => task.status === statusOfCell)
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(task => (
                      <Task task={task} status={statusOfCell}
                        sprintId={story.baseSprintId} key={task.id + task.status}/>
                    ))}
            </div>
              : null
            }
          {provided.placeholder}
        </td>
      )}
      
    </Droppable>
  </Fragment>
)