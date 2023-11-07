import { DynamoDBClient, ExecuteStatementCommand } from "@aws-sdk/client-dynamodb"
import { unmarshall } from "@aws-sdk/util-dynamodb"

const DynamoClient = new DynamoDBClient({
  endpoint: "http://dynamo-local:8000"
})

const Statement = ( Statement ) => {
  const command = new ExecuteStatementCommand({ Statement })
  return DynamoClient.send(command).then(data => {
    return data.Items.map(unmarshall)
  })

}

export { Statement }