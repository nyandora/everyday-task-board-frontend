import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Actions from '../authenticationActions'
import LoginForm from './LoginForm'


class LoginPage extends Component {

  render() {
    return (
      <Fragment>
        {this.props.isLoggedIn
          ?
            <Redirect to="/running" />
          :
            <div style={{margin: "20px auto 0", width: "300px"}}>
              <h2>Everyday Task Board ログイン</h2>
              <LoginForm onLoginButtonClick={this.login} />
            </div>
        }
      </Fragment>
    )
  }

  login = (param) => {
    this.props.dispatch(Actions.login(param))
  }

}

export default connect(state => ({
  isLoggedIn: state.login.isLoggedIn
}))(LoginPage)