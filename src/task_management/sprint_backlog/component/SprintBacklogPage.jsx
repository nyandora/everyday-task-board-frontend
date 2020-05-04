import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import MainLayout from '../../../common/component/MainLayout'
import SprintColumn from './SprintColumn'
import BacklogColumn from './BacklogColumn'
import Actions from '../sprintBacklogActions'
import Spin from '../../../common/component/Spin'


class SprintBacklog extends Component {

  componentDidMount() {
    if (!this.props.isLoaded) 
      this.props.dispatch(Actions.getSprints())
  }

  render() {
    const {sprints, backlogCategories, isClosedView} = this.props

    return (
      <MainLayout>
        {this.props.isLoaded
          ?
            <div style={{marginTop: "10px", display: "flex"}}>
              <DragDropContext onDragEnd={this.onDragEnd}>
      
                <SprintColumn sprints={sprints} isClosedView={isClosedView}/>
                <BacklogColumn backlogCategories={backlogCategories} isClosedView={isClosedView}/>
      
              </DragDropContext>
            </div>
          :
            <Spin />
        }
      </MainLayout>
    )
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    const isUnvalidDrop = !destination ||
                         (destination.droppableId === source.droppableId
                           && destination.index === source.index)

    if (isUnvalidDrop) return

    const isBelongingChanged = destination.droppableId !== source.droppableId
    if (isBelongingChanged) {
      this.props.dispatch(Actions.changeStoryBelonging({ sourceId: source.droppableId,
                                                          destinationId: destination.droppableId,
                                                          storyId: draggableId,
                                                          newIndex: destination.index }))
      
      return
    }

    const isSortOrderChanged = destination.index !== source.index
    if (isSortOrderChanged) {
      this.props.dispatch(Actions.changeStorySortOrder({ sourceId: source.droppableId,
                                                          storyId: draggableId,
                                                          newIndex: destination.index }))

      return
    }
    
  }


}

export default connect(state => {
  return {
    sprints: state.sprint.sprints,
    backlogCategories: state.sprint.backlogCategories,
    isLoaded: state.sprint.sprints !== undefined
  }
})(SprintBacklog)