import { push } from 'react-router-redux'

import Types from './signUpTypes'
import ApiCommon from '../common/utils/api/apiCommon';

export default store => next => action => {
  const {dispatch} = store

  if (action.type === Types.SIGN_IN) {
    ; (async () => {
      const params = action.payload

      const response = await ApiCommon.post("/user", params)

      if (response.ok) {
        dispatch(push("/login"))
      } else {
        alert("サインイン失敗")
      }
    })()
  }

  next(action)
}
