import { validateObject } from '/opt/nodejs/ObjectValidation/index.mjs'
import { InsertItem } from '/opt/nodejs/dynamoDB.mjs'
import { PromiseHandler } from '/opt/nodejs/Utils.mjs'

export const rootHandler = async (event) => {

  const user_id = '1'
  const body = JSON.parse(event.body || '{}')

  return handlers[event.httpMethod]({ body, user_id })
};

const handlers = {
  POST: async ({ body = null, user_id }) => {
    const date_now = new Date()

    const defined_data = {
      state: 'needs_picked',
      staging_location: 'none',
      date_created: date_now.toISOString(),
      customer: user_id
    }

    const data = { ...body, ...defined_data }

    const validation_data = validateObject({
      schema: 'orders',
      object: data
    })

    if ( validation_data.length > 0 ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: validation_data })
      }
    }

    return PromiseHandler(InsertItem({
      TableName: 'orders',
      data
    }))
  }
}
  