import { Statement } from '/opt/nodejs/dynamoDB.mjs'
import { validateObject } from '/opt/nodejs/ObjectValidation/index.mjs'
import { acceptable_states } from '/opt/nodejs/ObjectValidation/Schemas/orders.mjs'
import { PromiseHandler } from '/opt/nodejs/Utils.mjs'

export async function rootHandler(event) {
  
  const body = JSON.parse(event.body || '{}')
  const id = (event.pathParameters && ('id' in event.pathParameters)) ?
    event.pathParameters.id : null

  return await handlers[event.httpMethod]({ id, body })
}

const handlers = {
  GET : async ({ id = null }) => {

    let list_statement = 'SELECT customer, id, staging_location FROM orders'

    const response = id ?
      Statement(`SELECT * FROM orders WHERE id='${id}'`).then(data => data[0]) :
      Statement(list_statement)
  
    return await PromiseHandler(response)
  },
  PATCH: async ({ id = null, body = null }) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Yay! Our last route handler' })
    }
  }
}
