import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import moment from 'moment'

import Modal from '../../../common/component/Modal'
import Story from "./Story"
import StoryForm from './form/StoryForm'
import SprintForm from './form/SprintForm'
import Actions from '../sprintBacklogActions'

class Sprint extends Component {

  state = {
    isOpenStoryAdd: false,
    isOpenSprintEdit: false
  }

  render() {
    const {sprint, dispatch} = this.props

    const updateSprint = (param) => {
      dispatch(Actions.updateSprint(param))
      closeEditSprint()
    }

    const closeEditSprint = () => {
      this.setState({isOpenSprintEdit: false})
    }

    const addStory = (param) => {
      dispatch(Actions.addStory(param))
      closeAddStory()
    }

    const closeAddStory = () => {
      this.setState({isOpenStoryAdd: false})
    }

    return (
      <Droppable
        droppableId={sprint.id}>
        
        {provided => (
          <div ref={provided.innerRef}
              {...provided.droppableProps}
              style={{border: "1px solid lightgray", borderRadius: "5px", marginTop: "5px", background: "lightgray"}}>

            <div style={{margin: "2px", cursor: "move"}}>
              <img src="imgs/plus.png" style={{cursor: "pointer", verticalAlign: "middle"}}
                  onClick={() => this.setState({isOpenStoryAdd: true})}/>
              <Link to={`/sprints/${sprint.id}/task_board`}>
                <img src="imgs/grid.png" style={{cursor: "pointer", verticalAlign: "middle", marginLeft: "5px", opacity: "0.6"}}/>
              </Link>
              <span style={{verticalAlign: "middle", marginLeft: "3px"}}
                    onClick={() => this.setState({isOpenSprintEdit: true})}>
                {sprint.name}
              </span>
              <div style={{float: "right"}}>
                <span onClick={() => this.setState({isOpenSprintEdit: true})}>
                  {moment(sprint.startDate, "YYYYMMDD").format("MM/DD")}
                  〜
                  {moment(sprint.endDate, "YYYYMMDD").format("MM/DD")}
                </span>
              </div>
            </div>

            {sprint.stories.size > 0 ?
                Array.from(sprint.stories.values())
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map(story => (
                    <Story story={story} key={story.id} />
                  ))
                : null}

            {provided.placeholder}
        
            <Modal
              visible={this.state.isOpenSprintEdit}
              onCancel={closeEditSprint}
              footer={null}
              destroyOnClose
              width={500}>
              <SprintForm 
                mode={SprintForm.Mode.Edit}
                sprint={sprint}
                onSaveButtonClick={updateSprint}/>
            </Modal>

            <Modal
              visible={this.state.isOpenStoryAdd}
              onCancel={closeAddStory}
              footer={null}
              destroyOnClose
              width={500}>
              <StoryForm sprintId={sprint.id} onSaveButtonClick={addStory}/>
            </Modal>

          </div>
        )}
      </Droppable>
        
    )
  }
}

export default connect()(Sprint)
