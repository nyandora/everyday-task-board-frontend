import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, Popconfirm, Icon } from "antd"

import { Task } from '../../../taskManagementModel'

class TaskForm extends Component {

  componentDidMount() {
    // 描画時にサブミットボタンを非活性にする
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const nameError = isFieldTouched('name') && getFieldError('name')

    return (
      <Form labelCol={{span: 5}} wrapperCol={{span: 17 }} >
        <div style={{ marginBottom: "10px" }}>
          タスクの変更
        </div>

        <Form.Item
          label="タスク名" style={{marginBottom: 0}}
          validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {
            getFieldDecorator('name', {
              initialValue: this.props.task.name,
              rules: [
                { required: true, message: '入力してください' },
                { max: 50, message: '50文字以下で入力してください' }
              ],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Input autoFocus={true} />
              )
          }
        </Form.Item> 

        <Form.Item wrapperCol={{span: 22}} style={{marginTop: "10px", marginBottom: 0}}>
          <div style={{ float: "right" }}>
            <Button
              type="default"
              disabled={this.hasErrors(getFieldsError())}
              onClick={
                () => {
                  const values = this.props.form.getFieldsValue()

                  const task = new Task(
                    this.props.task.id,
                    values.name,
                    this.props.task.status,
                    this.props.task.baseStoryId,
                    this.props.task.sortOrder
                  )

                  this.props.onSaveButtonClick({task,
                                                sprintId: this.props.sprintId })
                }
              }
            >
              変更する
            </Button>

            <Popconfirm
              title="タスクを削除しますか？"
              okText="削除"
              okType="danger"
              cancelText="キャンセル"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={
                () => {
                  this.props.onDeleteButtonClick({taskId: this.props.task.id,
                                                  storyId: this.props.task.baseStoryId,
                                                  sprintId: this.props.sprintId})
                }
              }
            >
              <Button type="default" style={{marginLeft: "2px"}} >
                削除する
              </Button>
            </Popconfirm>
          </div>
        </Form.Item>

      </Form >
    )
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

}

TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  sprintId: PropTypes.string.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(TaskForm)
