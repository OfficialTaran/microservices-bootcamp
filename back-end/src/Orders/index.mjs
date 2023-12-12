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


    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
}
  