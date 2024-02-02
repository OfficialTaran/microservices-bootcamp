/**
 * Handle a promise and turn response into an Express response
 * 
 * @param {Promise} prom Unresolved promise
 * @param {object} res Express response object
 * @returns {Promise}
 */
const PromiseHandler = ( prom, res ) => {
  return prom.then(data => {
    res.json(data)
  }).catch( error => {
    console.error(error)
    res.status(500)
  })
}


/**
 * Check the Event Authorizer data to see if user is in employees group
 * 
 * @param {object} authorizer From lambda, event.requestContext.authorizer
 * @returns {boolean} Boolean to see if user is in employees group
 */
const verifyEmployee = ( authorizer ) => {
  if (process.env.STAGE === 'dev') {
    return true
  } else {
    if (authorizer.claims['cognito:groups']) {
      if (Array.isArray(authorizer.claims['cognito:groups'])) {
        // handle multiple groups case
        return authorizer.claims['cognito:groups'].includes('employees')
      } else {
        // handle single group case
        return authorizer.claims['cognito:groups'] === 'employees'
      }
    } else {
      return false
    }
  }
}

export { PromiseHandler, verifyEmployee }