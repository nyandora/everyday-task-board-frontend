import React from 'react'
import {HashRouter as Router, Redirect} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import "antd/dist/antd.css"

import ApiCommon from './common/utils/api/apiCommon'
import LoginCheck from './authentication/component/LoginCheck'
import LoginPage from './authentication/component/LoginPage'
import SignUpPage from './sign_up/component/SignUpPage'
import SprintBacklogPage from './task_management/sprint_backlog/component/SprintBacklogPage'
import TaskBoardPage from './task_management/task_board/component/TaskBoardPage'
import './App.css'

ApiCommon.init()

export default () => (
  <Router>
    <div style={{width: "100%", height: "100vh", padding: "10px"}}>
      <Switch>
        <Route path={'/'} exact={true} render={() => <LoginCheck><Redirect to="/running" /></LoginCheck>}/>
        <Route path={'/signUp'} exact={true} component={SignUpPage}/>
        <Route path={'/login'} exact={true} component={LoginPage}/>
        <Route path={'/running'} exact={true} render={() => <SprintBacklogPage isClosedView={false}/>} />
        <Route path={'/closed'} exact={true} render={() => <SprintBacklogPage isClosedView={true}/>} />
        <Route path={'/sprints/:sprintId/task_board'} exact={true}render={(props) => <TaskBoardPage {...props}/>} />
      </Switch>
    </div>
  </Router>
)
