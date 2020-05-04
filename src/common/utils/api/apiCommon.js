let setting = undefined
let endPoint = ""
const mode = "cors"
const credential = "same-origin"
const headers = new Headers({
  "Content-type": "application/json"
})

export default class ApiCommon {
  static Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  }

  static init(serverSetting) {
    // setting = serverSetting
    // endPoint = `${setting.url}/${setting.base}`
    endPoint = ""
  }

  static async get(path) {
    return doFetch(
      getApiUrl(path),
      getOption()
    )
  }

  static async post(path, request, option) {
    return doFetch(
      getApiUrl(path),
      getUpdateOption(ApiCommon.Method.POST, request, option)
    )
  }

  static async put(path, request) {
    return doFetch(
      getApiUrl(path),
      getUpdateOption(ApiCommon.Method.PUT, request)
    )
  }

  static async delete(path, request) {
    return doFetch(
      getApiUrl(path),
      getUpdateOption(ApiCommon.Method.DELETE, request)
    )
  }
}

const getApiUrl = (path) => {
  const apiUrl = `${endPoint}${path}`
  return apiUrl
}

const getOption = () => {
  const option = {
    method: ApiCommon.Method.GET,
    mode,
    credential,
    headers
  }

  return option
}

const getUpdateOption = (method, request, priorOption) => {
  const option = {
    method: method,
    mode,
    credential,
    headers,
    body: JSON.stringify(request),
  }
  return Object.assign({}, option, priorOption)
}

const doFetch = async (path, option) => {
  let ok = false
  let status = -1
  return await fetch(
    path,
    option,
  ).then(response => {
    ok = response.ok
    status = response.status
    return response.text()
  }).then(text => {
    const json = (text !== "") ? JSON.parse(text) : {}
    return { ok, status, json }
  }).catch(error => {
    throw error
  })
}
