exports.hello = async (event) => {
  console.log('hello there@@')
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v4.0! Your function executed successfully!'
    })
  };
};
