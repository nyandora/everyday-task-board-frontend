import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'

import Modal from '../../../common/component/Modal'
import Sprint from "./Sprint"
import SprintForm from './form/SprintForm'
import Actions from '../sprintBacklogActions'

class SprintColumn extends Component {

  state = {
    isOpenSprintAdd: false
  }

  render() {
    const {sprints, dispatch, isClosedView} = this.props

    const addSprint = (param) => {
      dispatch(Actions.addSprint(param))
      closeAddSprint()
    }

    const closeAddSprint = () => {
      this.setState({isOpenSprintAdd: false})
    }

    return (
      <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
          <div style={{margin: "3px"}}>
            {!isClosedView ? 
                <img src="imgs/plus.png" style={{cursor: "pointer"}}
                    onClick={() => this.setState({isOpenSprintAdd: true})}/>
            : null}
            <span style={{verticalAlign: "middle", marginLeft: "3px"}}>スプリント</span>
          </div>
    
        {sprints ? (
            <Fragment >
              {
                Array.from(sprints.values())
                  .filter(sprint => !isClosedView ? sprint.status !== "end" : sprint.status === "end")
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map(sprint => (
                    <Sprint sprint={sprint} key={sprint.id}/>
                  ))
              }
            </Fragment>
          ) : null}

          <Modal
            visible={this.state.isOpenSprintAdd}
            onCancel={closeAddSprint}
            footer={null}
            destroyOnClose
            width={500}>
            <SprintForm 
              mode={SprintForm.Mode.New}
              onSaveButtonClick={addSprint}/>
          </Modal>
    
      </div>
    )
  }
} 

export default connect()(SprintColumn)
