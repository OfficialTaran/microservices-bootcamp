import { Statement } from "/opt/nodejs/dynamoDB.mjs";

export const rootHandler = async (event) => {
  const result = (event.pathParameters && ('id' in event.pathParameters)) ? 
    Statement(`SELECT name, id, in_stock, nominal_dimensions FROM products WHERE id='${event.pathParameters.id}'`).then(data => data[0]) :
    Statement('SELECT name, id, in_stock FROM products WHERE in_stock > 0')

  const data = await result

  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  return response;
};
  