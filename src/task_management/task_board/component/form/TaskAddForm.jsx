import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button } from "antd"

class TaskAddForm extends Component {

  componentDidMount() {
    // 描画時にサブミットボタンを非活性にする
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const namesError = isFieldTouched('names') && getFieldError('names')

    return (
      <Form>
        <div style={{ marginBottom: "10px" }}>
          新しいタスク
        </div>

        <Form.Item
          label="タスク名（１行に１タスク名）" style={{marginBottom: 0}}
          validateStatus={namesError ? 'error' : ''} help={namesError || ''}>
          {
            getFieldDecorator('names', {
              rules: [
                { 
                  validator: async (rule, value) => {
                    if (!value) {
                      throw new Error("入力してください")
                    }

                    const names = value.split("\n")
                    if (names.some(name => !name)) {
                      throw new Error("空行があります")
                    }
                    if (names.some(name => name.length > 50)) {
                      throw new Error("タスク名は50文字以内で入力してください")
                    }
                  }
                }
              ],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Input.TextArea
                  autoFocus={true}
                  autosize={{minRows: 7}}/>
              )
          }
        </Form.Item> 

        <Form.Item style={{marginTop: "10px", marginBottom: 0}}>
          <Button
            type="default"
            style={{float: "right"}}
            disabled={this.hasErrors(getFieldsError())}
            onClick={() => {
              const values = this.props.form.getFieldsValue()

              this.props.onSaveButtonClick({
                sprintId: this.props.sprintId,
                storyId: this.props.storyId,
                taskNames: values.names.split("\n")
              })
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

TaskAddForm.propTypes = {
  sprintId: PropTypes.string.isRequired,
  storyId: PropTypes.string.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(TaskAddForm)
