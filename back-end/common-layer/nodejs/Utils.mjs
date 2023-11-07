/**
 * Handle a promise and turn response into a lambda response object
 * 
 * @param {Promise} prom Unresolved promise
 * @returns {Promise} A promise that will resolve to a lambda response object
 */
const PromiseHandler = ( prom ) => {
  return prom.then(data => {
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }).catch(error => {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        mag: 'Internal Service Error'
      })
    }
  })
}

export { PromiseHandler }