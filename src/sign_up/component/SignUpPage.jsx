import React, { Component } from 'react'
import {connect} from 'react-redux'

import Actions from '../signUpActions'
import SignUpForm from './SignUpForm'


class SignUpPage extends Component {

  render() {
    return (
      <div style={{margin: "20px auto 0", width: "350px"}}>
        <h2>Everyday Task Board へようこそ！</h2>
        <p>新規登録（無料）をして、利用を開始しましょう。</p>
        <SignUpForm onSignUpButtonClick={this.signUp} />
      </div>
    )
  }

  signUp = (param) => {
    this.props.dispatch(Actions.signUp(param))
  }

}

export default connect()(SignUpPage)