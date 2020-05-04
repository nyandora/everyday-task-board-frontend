import Types from './signUpTypes'

export default {

  signUp: payload => ({
    type: Types.SIGN_IN,
    payload
  })
  
}
