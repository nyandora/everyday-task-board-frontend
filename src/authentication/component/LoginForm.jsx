import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button } from "antd"
import { Link } from 'react-router-dom'
import "./LoginForm.css"

class LoginForm extends Component {

  state = {
    // 初期描画の時点でログインボタンを非活性にする
    isLoginButtonDisabled: true
  }
  
  componentDidMount() {
    // 描画時に送信ボタンを非活性にする
    this.props.form.validateFields()

    // 初期描画以降は、バリデーションエラーの有無に応じてログインボタンの活性状態を制御する
    this.setState({isLoginButtonDisabled: false})
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div id="loginForm">
        <Form style={{marginTop: "40px"}} hideRequiredMark={true}>

          <Form.Item
            label="メールアドレス"
            validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
            {
              getFieldDecorator('email', {
                rules: [
                  { required: true, message: '入力してください' },
                  { max: 100, message: '100文字以下で入力してください' }
                ],
                validateTrigger: [ "onBlur", "onChange" ]
              })(
                  <Input autoFocus={true} />
                )
            }
          </Form.Item> 

          <Form.Item
            label="パスワード" style={{marginBottom: 0}}
            validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '入力してください' },
                  { max: 100, message: '100文字以下で入力してください' }
                ],
                validateTrigger: [ "onBlur", "onChange" ]
              })(
                  <Input type="password" />
              )
            }
          </Form.Item> 

          <Form.Item style={{marginTop: "35px", marginBottom: 0}}>
            <Button
              type="primary"
              disabled={this.state.isLoginButtonDisabled || this.hasErrors(getFieldsError())}
              style={{width: "100%"}}
              onClick={() => {
                const values = this.props.form.getFieldsValue()
                this.props.onLoginButtonClick({
                  email: values.email,
                  pass: values.password
                })
              }}
            >
              ログイン
            </Button>
          </Form.Item>

          <Form.Item style={{marginTop: "10px", marginBottom: 0}}>
            <Link to="/signUp" style={{float: "right"}}>ユーザー登録</Link>
          </Form.Item>

        </Form >
      </div>
    )
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

}

LoginForm.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(LoginForm)
