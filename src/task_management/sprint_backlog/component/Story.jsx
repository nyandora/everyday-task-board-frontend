import React, {Component} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { Input, Button, Popconfirm, Icon} from "antd"

import Actions from '../sprintBacklogActions'
import { Story } from '../../taskManagementModel'

class StoryBox extends Component {

  state = {
    isEditing: false,
    storyName: this.props.story.name
  }

  render() {
    const {story} = this.props

    return (
      <Draggable
        draggableId={story.id} index={story.sortOrder}>
      
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.state.isEditing ? (
              <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px", background: "whitesmoke", cursor: "move"}}>

                <Input
                  size="small"
                  autoFocus={true}
                  value={this.state.storyName}
                  onChange={(e) => this.handleTextChange(e, "storyName")}
                />
                <Button
                  size="small"
                  type="default"
                  onClick={
                    () => {
                      const storyToUpdate = new Story(
                        story.id,
                        this.state.storyName
                      )
                      this.changeStoryName(storyToUpdate)
                    }
                  }
                >
                  変更
                </Button>
                <Button
                  size="small"
                  type="default"
                  onClick={() => { this.setState({...this.state, isEditing: false})}}
                >
                  キャンセル
                </Button>
              </div>
              ) : (
              <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px",
                           background: "whitesmoke", cursor: "move", position: "relative"}}>
                <div style={{textDecoration: story.status === "end" ? "line-through" : "", width: "90%"}}
                      onClick={() => {this.setState({isEditing: true})}}>
                  {story.name}
                </div>
                <Popconfirm
                  title="ストーリーを削除しますか？紐づくタスクも併せて削除されます。"
                  onConfirm={this.deleteStory}
                  okText="削除"
                  okType="danger"
                  cancelText="キャンセル"
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                >
                  <img src="imgs/trash-can.png"
                        style={{position: "absolute", right: "2px", top: "4px", cursor: "pointer", opacity: "0.7"}} />
                </Popconfirm>
              </div>
              )
          }
          </div>
        )}
    
      </Draggable>
    )

  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  changeStoryName = (param) => {
    this.props.dispatch(Actions.changeStoryName(param))
    this.setState({isEditing: false})
  }

  deleteStory = () => {
    this.props.dispatch(Actions.deleteStory(this.props.story))
  }


}

export default connect()(StoryBox)