import axios from 'axios'

const makeAPICall = async ({ verb = 'GET', route, data = null, params = null }) => {

  const request_object = {
    method: verb,
    url: window.location.origin + route
  }

  if (data) {
    request_object.data = data
  }

  if (params) {
    request_object.params = params
  }

  return await axios.request(request_object)
}

export { makeAPICall }