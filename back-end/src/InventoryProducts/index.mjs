import { Statement, InsertItem } from '/opt/nodejs/dynamoDB.mjs'
import { validateObject } from '/opt/nodejs/ObjectValidation/index.mjs'
import { PromiseHandler } from '/opt/nodejs/Utils.mjs'

export async function rootHandler(event) {

  const body = JSON.parse(event.body || '{}')
  const id = (event.pathParameters && ('id' in event.pathParameters)) ?
    event.pathParameters.id : null

  return await handlers[event.httpMethod]({ id, body })
}

const handlers = {
  GET : async ({ id = null }) => {
    const response = id ?
      Statement(`SELECT * FROM products WHERE id='${id}'`).then(data => data[0]) :
      Statement('SELECT name, id FROM products')
  
    return await PromiseHandler(response)
  },
  POST: async ({ body = null }) => {

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'hello' })
    }
  },
  PUT: async ({ id = null, body = null }) => {

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'hello' })
    }
  }
}
