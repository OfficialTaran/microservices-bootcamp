export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      msg: "hello world, I'm the first local function of the course!"
    }),
  };
  return response;
};
  