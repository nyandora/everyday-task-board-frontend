import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import Modal from '../../../common/component/Modal'
import TaskForm from './form/TaskForm'
import Actions from '../taskBoardActions'


class Task extends Component {

  state = {
    isEditing: false
  }

  render() {
    const {task, sprintId, dispatch} = this.props

    const updateTask = (param) => {
      dispatch(Actions.updateTask(param))
      closeTaskEdit()
    }

    const deleteTask = (param) => {
      dispatch(Actions.deleteTask(param))
    }

    const closeTaskEdit = () => {
      this.setState({...this.state, isEditing: false})
    }

    return (
      <Fragment>
        <Draggable
          draggableId={task.id} index={task.sortOrder}>
          
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div style={{ width: "80px", height: "80px", background: "#87cefa", borderRadius: "5px",
                marginRight: "3px", marginBottom: "3px", cursor: 'move', wordWrap: "break-word",
                textDecoration: task.status === "end" ? "line-through" : "" , overflow: "hidden"}}
                onClick={() => this.setState({...this.state, isEditing: true})}>
                {task.name}
              </div>
              
            </div>
          )}

        </Draggable>

        <Modal
          visible={this.state.isEditing}
          onCancel={closeTaskEdit}
          footer={null}
          destroyOnClose
          width={500}>
          <TaskForm
            task={task}
            sprintId={sprintId}
            onSaveButtonClick={updateTask}
            onDeleteButtonClick={deleteTask}/>
        </Modal>

      </Fragment>
    )
  }
}

export default connect()(Task)
