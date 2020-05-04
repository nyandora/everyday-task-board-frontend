import Types from './authenticationTypes'

export default {

  login: payload => ({
    type: Types.LOGIN,
    payload
  }),

  setLoginUser: payload => ({
    type: Types.SET_LOGIN_USER,
    payload
  }),

  markNotLoggedInYet: payload => ({
    type: Types.MARK_NOT_LOGGED_IN_YET,
    payload
  }),

  getLoginUser: () => ({
    type: Types.GET_LOGIN_USER
  }),

  logout: () => ({
    type: Types.LOGOUT
  }),

  clearLoginUser: () => ({
    type: Types.CLEAR_LOGIN_USER
  })

}
