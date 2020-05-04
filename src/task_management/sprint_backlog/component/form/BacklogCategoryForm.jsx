import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button } from "antd"

import { BacklogCategory } from '../../../taskManagementModel'

class BacklogCategoryForm extends Component {

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
          新しいバックログカテゴリー
        </div>

        <Form.Item
          label="バックログカテゴリー名" style={{marginBottom: 0}}
          validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {
            getFieldDecorator('name', {
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

        <Form.Item wrapperCol={{span: 22}} style={{marginTop: "10px", marginBottom: 0}}>
          <Button
            type="default"
            style={{float: "right"}}
            disabled={this.hasErrors(getFieldsError())}
            onClick={() => {
              const values = this.props.form.getFieldsValue()

              const backlogCategory = new BacklogCategory(
                null,
                values.name,
              )
          
              this.props.onSaveButtonClick(backlogCategory)
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

BacklogCategoryForm.propTypes = {
  onSaveButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(BacklogCategoryForm)
