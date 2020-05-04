import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button } from "antd"

import { Story } from '../../../taskManagementModel'

class StoryForm extends Component {

  componentDidMount() {
    // 描画時にサブミットボタンを非活性にする
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const nameError = isFieldTouched('name') && getFieldError('name')

    return (
      <Form labelCol={{span: 7}} wrapperCol={{span: 15 }} >
        <div style={{ marginBottom: "10px" }}>
          新しいストーリー
        </div>

        <Form.Item
          label="ストーリー名" style={{marginBottom: 0}}
          validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {
            getFieldDecorator('name', {
              initialValue: this.props.sprint ? this.props.sprint.name : null,
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
          <Button
            type="default"
            style={{float: "right"}}
            disabled={this.hasErrors(getFieldsError())}
            onClick={() => {
              const values = this.props.form.getFieldsValue()

              const story = new Story(
                null,
                values.name,
                null,
                this.props.sprintId,
                this.props.backlogCategoryId,
                null,
                null
              )
          
              this.props.onSaveButtonClick(story)
            }}
          >
            追加する
          </Button>
        </Form.Item>

      </Form >
    )
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

}

StoryForm.propTypes = {
  sprintId: PropTypes.string,
  backlogCategoryId: PropTypes.string,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(StoryForm)
