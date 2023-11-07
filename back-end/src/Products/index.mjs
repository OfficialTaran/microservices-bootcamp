import { Statement } from "/opt/nodejs/dynamoDB.mjs";

export const rootHandler = async (event) => {
  const result = await Statement('SELECT * FROM products')

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};
  