import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, Select } from "antd"

import { Story } from '../../../taskManagementModel'

class StoryEditForm extends Component {

  componentDidMount() {
    // 描画時にサブミットボタンを非活性にする
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const nameError = isFieldTouched('name') && getFieldError('name')
    const statusError = isFieldTouched('status') && getFieldError('status')

    return (
      <Form labelCol={{span: 7}} wrapperCol={{span: 15 }} >
        <div style={{ marginBottom: "10px" }}>
          ストーリーの変更
        </div>

        <Form.Item
          label="ストーリー名" style={{marginBottom: 0}}
          validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {
            getFieldDecorator('name', {
              initialValue: this.props.story.name,
              rules: [
                { required: true, message: '入力してください' },
                { max: 50, message: '50文字以下で入力してください' }
              ],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Input autoFocus={true}/>
              )
          }
        </Form.Item> 

        <Form.Item
          label="ステータス" style={{marginBottom: 0}}
          validateStatus={statusError ? 'error' : ''} help={statusError || ''}>
          {
            getFieldDecorator('status', {
              initialValue: this.props.story.status,
              rules: [{ required: true, message: '入力してください' }],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Select dropdownMatchSelectWidth={false}>
                  <Select.Option key={"new"}>新規</Select.Option>
                  <Select.Option key={"running"}>進行中</Select.Option>
                  <Select.Option key={"end"}>完了</Select.Option>
                </Select>
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
                this.props.story.id,
                values.name,
                values.status,
                this.props.story.baseSprintId
              )
          
              this.props.onSaveButtonClick(story)
            }}
          >
            変更する
          </Button>
        </Form.Item>

      </Form >
    )
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

}

StoryEditForm.propTypes = {
  story: PropTypes.object.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(StoryEditForm)
