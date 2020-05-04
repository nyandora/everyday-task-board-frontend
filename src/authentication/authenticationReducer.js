import Types from './authenticationTypes'

const initState = {
  isLoggedIn: undefined,
  email: undefined,
  userName: undefined
}

export default (state = initState, action) => {
  switch (action.type) {
    case Types.SET_LOGIN_USER: {
      const { email, userName } = action.payload
      return { ...state, isLoggedIn: true,  email, userName }
    }
    case Types.MARK_NOT_LOGGED_IN_YET: {
      return { ...state, isLoggedIn: false }
    }
    case Types.CLEAR_LOGIN_USER: {
      return {...initState, isLoggedIn: false}
    }
    default:
      return state
  }
}
