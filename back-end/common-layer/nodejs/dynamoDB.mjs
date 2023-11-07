import { DynamoDBClient, ExecuteStatementCommand } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"

const DynamoClient = new DynamoDBClient({
  endpoint: "http://dynamo-local:8000"
})

/**
 * Run a PartiQL statement against DynamoDB
 * 
 * @param {string} Statement The PartiQL statement to run
 * @param {*[]} [Parameters] an array of values to add to a prepared statement
 * @returns {Promise<object[]>} response from dynamodb
 */
const Statement = ( Statement, Parameters = null ) => {
  
  if (Parameters) {
    Parameters = Parameters.map(marshall)
  }

  const command = new ExecuteStatementCommand({ Statement, Parameters })
  return DynamoClient.send(command).then(data => {
    return data.Items.map(unmarshall)
  })

}

export { Statement }