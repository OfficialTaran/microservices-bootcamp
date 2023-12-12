import { DynamoDBClient, ExecuteStatementCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import { v4 as uuidv4 } from "uuid"

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

/**
 * Insert a new item into a DynamoDB table. A UUID will be added to the object.
 * The calling Lambda function must have read/write access to the
 * table. For local testing, updates will be run against dynamodb local.
 * 
 * @param {TableName: string, data: object} param0 
 * @returns {Promise<object>} Output from the Put Command, new object id
 */
const InsertItem = ({ TableName, data }) => {
  const uuid = uuidv4()
  data.id = uuid

  const command = new PutItemCommand({
    TableName,
    Item: marshall(data)
  })

  return DynamoClient.send(command).then(res => {
    return {
      res: res,
      id: uuid
    }
  })
}

export { Statement, InsertItem }