import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, DatePicker, Select } from "antd"
import moment from 'moment'

import { Sprint } from '../../../taskManagementModel'

const dateFormat = 'YYYY/MM/DD'

class SprintForm extends Component {
  
  static Mode = {
    New: "New",
    Edit: "Edit"
  }

  state = {
    isPeriodTouched: false
  }

  componentDidMount() {
    // 描画時にサブミットボタンを非活性にする
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const nameError = isFieldTouched('name') && getFieldError('name')
    const statusError = isFieldTouched('status') && getFieldError('status')
    // DatePickerの場合はフォーカスインしてもisFieldTouchedがtrueにならないため、独自に状態を管理する
    const periodError = this.state.isPeriodTouched && getFieldError('period')

    return (
      <Form labelCol={{span: 7}} wrapperCol={{span: 15 }} >
        <div style={{ marginBottom: "10px" }}>
          {this.props.mode === SprintForm.Mode.New ? "新しいスプリント" : "スプリントの変更"}
        </div>

        <Form.Item
          label="スプリント名" style={{marginBottom: 0}}
          validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {
            getFieldDecorator('name', {
              initialValue: this.props.sprint ? this.props.sprint.name : null,
              rules: [
                { required: true, message: '入力してください' },
                { max: 10, message: '10文字以下で入力してください' }
              ],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Input />
              )
          }
        </Form.Item> 

        <Form.Item
          label="期間" style={{ marginBottom: 0}}
          validateStatus={periodError ? 'error' : ''} help={periodError || ''} required>
          {
            getFieldDecorator('period', {
              initialValue:
                this.props.sprint
                    ? [moment(this.props.sprint.startDate, "YYYYMMDD"), moment(this.props.sprint.endDate, "YYYYMMDD")]
                    : [null, null],
              rules: [
                { 
                  validator: async (rule, value) => {
                    const startDate = value[0]
                    const endDate = value[1]
                    if (!startDate || !endDate) {
                      throw new Error("入力してください")
                    }
                  }
                }
              ]
  
            })(
                <DatePicker.RangePicker
                  format={dateFormat}
                  placeholder={["日付を選択", "日付を選択"]}
                  onBlur={() => this.setState({isPeriodTouched: true})} />
              )
          }
        </Form.Item>

        {this.props.mode === SprintForm.Mode.Edit
          ?
            <Form.Item
              label="ステータス" style={{marginBottom: 0}}
              validateStatus={statusError ? 'error' : ''} help={statusError || ''}>
              {
                getFieldDecorator('status', {
                  initialValue: this.props.sprint ? this.props.sprint.status : null,
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
          : null
        }

        <Form.Item wrapperCol={{span: 22}} style={{marginTop: "10px", marginBottom: 0}}>
          <Button
            type="default"
            style={{float: "right"}}
            disabled={this.hasErrors(getFieldsError())}
            onClick={() => {
              const values = this.props.form.getFieldsValue()

              const sprint = new Sprint(
                this.props.sprint ? this.props.sprint.id: null,
                values.name,
                values.status,
                values.period[0].format("YYYYMMDD"),
                values.period[1].format("YYYYMMDD"),
              )
          
              this.props.onSaveButtonClick(sprint)
            }}
          >
            {this.props.mode === SprintForm.Mode.New ? "追加する" : "変更する"}
          </Button>
        </Form.Item>

      </Form >
    )
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

}

SprintForm.propTypes = {
  mode: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(SprintForm)
