import { helloFunction } from "/opt/nodejs/Utils.mjs";

export const rootHandler = async (event) => {
  const hello = helloFunction()

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      msg: hello
    }),
  };
  return response;
};
  