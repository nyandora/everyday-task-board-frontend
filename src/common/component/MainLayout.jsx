import React, { Fragment, Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from "antd"

import LoginCheck from '../../authentication/component/LoginCheck'
import Actions from '../../authentication/authenticationActions'

class MainLayout extends Component {
  render() {
    return (
      <LoginCheck>
        <div>
          <a href="/">
            <img src="imgs/logo.png" />
          </a>
          &nbsp;&nbsp;
          <Link to={'/running'} style={{verticalAlign: "middle"}}>進行中</Link>
          &nbsp;&nbsp;
          <Link to={'/closed'} style={{verticalAlign: "middle"}}>過去分</Link>
    
          <div style={{float: "right"}}>
            <span>{this.props.loginUser.userName}</span>
            <Button type="link" size="small" style={{marginLeft: "5px"}} onClick={this.logout}>ログアウト</Button>
          </div>
        </div>
      
        {this.props.children}
      </LoginCheck>
    )
  }

  logout = () => {
    this.props.dispatch(Actions.logout())
  }
  
}

export default connect(state => ({
  loginUser: state.login
}))(MainLayout)
