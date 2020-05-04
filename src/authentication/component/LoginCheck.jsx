import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Spin from '../../common/component/Spin'
import Actions from '../authenticationActions'

class LoginCheck extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn === undefined) {
      this.props.dispatch(Actions.getLoginUser())
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoggedIn === undefined
          ?
            <Spin />
          :
            this.props.isLoggedIn
              ?
                <Fragment>
                  {this.props.children}
                </Fragment>
              :
                <Redirect to="/login" />
        }
      </Fragment>
    )
  }
}

export default connect(state => ({
    isLoggedIn: state.login.isLoggedIn
  }))(LoginCheck)