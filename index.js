const AWS = require('aws-sdk')
const sns = new AWS.SNS({ apiVersion: '2010-03-31' })

exports.handler = (event, _, callback) => {
  const { headers, pathParameters } = event

  return new Promise((resolve, reject) => {
    typeof headers.Authorization === 'string'
      ? resolve()
      : reject({
        status: 403,
        message: 'Unauthorized'
      })
  })
    .then(() => sns.publish({
      Message: JSON.stringify({
        token: headers.Authorization.replace('Bearer ', ''),
        reward: pathParameters.id
      }),
      TopicArn: process.env.SNS_TOPIC
    }).promise())
    .then(() => ({ status: 202, body: { status: 202 } }))
    .catch((error = {}) => {
      return {
        status: error.status || 500,
        body: {
          status: error.status || 500,
          message: error.message || 'InternalServerError'
        }
      }
    })
    .then(({ status, body }) => callback(null, {
      statusCode: status,
      body: JSON.stringify(body),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }))
}
