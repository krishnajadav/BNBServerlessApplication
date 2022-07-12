const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
  let requestJSON = JSON.parse(event.body);
      var params = {
      TableName: 'RoomDetails',
      Item: {
        'id' :{S:requestJSON.id},
        'roomAmenity' :{S: requestJSON.roomAmenity},
        'noBeds' :{N:requestJSON.noBeds},
        'roomNo' :{S:requestJSON.roomNo},
        'roomPrice' :{N: requestJSON.roomPrice}
      }
    };
    var result = await dynamo.putItem(params).promise();
    result = JSON.stringify(result);
   return result;
};