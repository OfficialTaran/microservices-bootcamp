import { validateObject } from '/opt/nodejs/ObjectValidation/index.mjs'
import { InsertItem, Statement } from '/opt/nodejs/dynamoDB.mjs'
import { PromiseHandler } from '/opt/nodejs/Utils.mjs'
import { BadProductIDError, InvalidQuantityError } from '/opt/nodejs/Errors.mjs';

export const rootHandler = async (event) => {

  const user_id = '1'
  const body = JSON.parse(event.body || '{}')

  return handlers[event.httpMethod]({ body, user_id })
};

const cancellable_state = [
  'needs_picked',
  'staged'
]

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

    try {
      await updateProducts({ goods_ordered: data.goods_ordered })
    } catch (error) {
      if(['InvalidQuantityError','BadProductIDError'].includes(error.name)) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            msg: error.message
          })
        }
      } else {
        console.error(error)
        return {
          statusCode: 500,
          body: JSON.stringify({
            msg: 'Internal Service Error'
          })
        }
      }
    }
    

    return PromiseHandler(InsertItem({
      TableName: 'orders',
      data
    }))
  },
  DELETE: async ({ id = null, user_id }) => {

    try {
      const order = await Statement(`SELECT goods_ordered, state, customer FROM orders WHERE id=${id}`)
        .then( orders => orders[0])

      if (! cancellable_state.includes(order.state)) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            msg: `Can't cancel order in state ${order.state}`
          })
        }
      }

      if ( order.customer !== user_id ) {
        return {
          statusCode: 404,
          body: JSON.stringify({ msg: `Can't access info for order ${id}` })
        }
      }

      await updateProducts({ goods_ordered: order.goods_ordered, operation: 'add' })
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: 'Internal Service Error'
        })
      }
    }


    return await PromiseHandler(
      Statement('UPDATE orders SET state=? SET staging_location=? WHERE id=?',
      ['cancelled','none',id])
    )
  }
}
  
const updateProducts = async ({ goods_ordered, operation = 'subtract' }) => {

  const products = await Statement('SELECT id, in_stock FROM products')

  const order_quantities = []
  goods_ordered.forEach(item => {
    const product = products.find(p => p.id === item.product_id)

    if (product === undefined) {
      throw new BadProductIDError(`product with ID: ${item.product_id} not found`)
    }

    const index = order_quantities.findIndex(i => i.product_id === item.product_id)
    if (index === -1) {
      order_quantities.push({
        product_id: item.product_id,
        quantity: Number(item.quantity)
      })
    } else {
      order_quantities[index].quantity += item.quantity
    }
  })

  if ( operation === 'subtract' ) {
    order_quantities.forEach(item => {
      const product = products.find(p => p.id === item.product_id)

      if (product.in_stock < item.quantity) {
        throw new InvalidQuantityError(`product ${item.product_id} in_stock less than ordered quantity`)
      }
    })
  }

  const operator = operation_map[operation]

  const promises = order_quantities.map(item => {
    return Statement(`UPDATE products SET in_stock = in_stock ${operator} ? WHERE id=?`,
      [item.quantity,item.product_id])
  })

  return await Promise.all(promises)
  
}

const operation_map = {
  subtract: '-',
  add: '+'
}