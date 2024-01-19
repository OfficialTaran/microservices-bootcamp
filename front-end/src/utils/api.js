import axios from 'axios'
import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

const pool_id = process.env.VUE_APP_COGNITO_POOL_ID
const client_id = process.env.VUE_APP_COGNITO_CLIENT_ID
const domain_prefix = process.env.VUE_APP_COGNITO_DOMAIN_PREFIX
const region = process.env.VUE_APP_AWS_REGION

const OIDCUserManager = new UserManager({
  authority: `https://cognito-idp.${region}.amazonaws.com/${pool_id}`,
  client_id,
  redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'aws.cognito.signin.user.admin openid',
  userStore: new WebStorageStateStore()
})


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

  const user = await OIDCUserManager.getUser()
  if (user && user.id_token) {
    request_object.headers = {
      Authorization: user.id_token
    }
  }

  return await axios.request(request_object)
}

const tokenExchange = async () => {
  const params = new URLSearchParams(window.location.search.substring(1))
  if (params.has('code') && params.has('state')) {
    await OIDCUserManager.signinRedirectCallback().then(() => {
      const url = document.location.href
      window.history.pushState({}, "", url.split("?")[0])
    })
  }
}

const signOut = async () => {
  await OIDCUserManager.removeUser()
  window.location.href = `https://${domain_prefix}.auth.${region}.amazoncognito.com`
    + `/logout?client_id=${client_id}&logout_uri=${encodeURIComponent(window.location.origin)}`
}

export { makeAPICall, tokenExchange, signOut, OIDCUserManager as UserManager }