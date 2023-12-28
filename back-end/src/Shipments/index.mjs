import { Statement, InsertItem } from '/opt/nodejs/dynamoDB.mjs'
import { validateObject } from '/opt/nodejs/ObjectValidation/index.mjs'
import { BadProductIDError } from '/opt/nodejs/Errors.mjs'
import { PromiseHandler } from '/opt/nodejs/Utils.mjs'

export async function rootHandler(event) {
  const body = JSON.parse(event.body || '{}')
  const id = (event.pathParameters && ('id' in event.pathParameters)) ?
    event.pathParameters.id : null

  return await handlers[event.httpMethod]({ id, body })
}

const handlers = {
  GET : async ({ id = null }) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'hello' })
    }
  },
  POST: async ({ body = null }) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'hello' })
    }
  }
}
