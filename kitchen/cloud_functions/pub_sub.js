var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "ASIAZSJWKMQSKV6WFHYS",
    secretAccessKey: "DXBiO6prbVr7JblMUzgzR4yss64R45aF1ltXPxhI",
    sessionToken: "FwoGZXIvYXdzEDYaDFPkxIK4pbLY69vdHSLAAVgwcMEK+2J4DFW70YIV+CT0M/bcdHCtKV4nU/C46InY3NpdQ71Uo+u9gwyBwBvw1d3Gv7AvilqU0Tj/WHKMBMpYdocZ6Y5THamvD8NNuVa0OwYn+U7p5Mr/FOeyqqzEDweU3zlF0dHU7FlNTUgI0E06bo/jT8bQa1xxwkCHz5MfB81jl9Z1ljP5yI5fGTc+V7c/Mw/IDb73KUP7KnlHYE6rId/AdhmO5wbkAgWOqmDiHWavQaDHJQn0biJUSdshhiirgu6WBjItaHf4LZsP0o7Sx7yLhzOwbt8wPJcW9xOM7UZJKgFXAGLSef1X3Or4rBFLE8lZ"
  });

AWS.config.update({
    region: "us-east-1"
});
const {PubSub} = require('@google-cloud/pubsub');
const pubSubClient = new PubSub("ultra-mediator-352903");
const dynamo = new AWS.DynamoDB.DocumentClient();

  async function updateItemDb(params) {
    return new Promise(function(resolve, reject) {
        dynamo.update(params, function(err, data) {
            if (err) {
              console.log(err);
              resolve(false);
            }
            else {
              console.log(data);
              resolve(true);
            }
        });
    });
}

async function publishMessage(message) {
  console.log(message);
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(message);

  try {
    const messageId = await pubSubClient
      .topic('projects/ultra-mediator-352903/topics/notify')
      .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
  }
}
exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'Hello, World';
  console.log(message);

  var timedelay = message.split(',')[0];
  var delay = timedelay*60*1000;
  setTimeout(function() {
    var orderId = message.split(',')[1];
   
     var customerId = message.split(',')[2];
      console.log(customerId);
    var orderStatus = "Ready";
  
    var currentDate = new Date();
   
   var readyTime = currentDate.toISOString();
   var readTimeinDB = "2022-07-17T20:17:30.204Z";
  
    if(readyTime>readTimeinDB){
      console.log("ordeerchange to ready");
      const params = {
        TableName: "orders",
        Key: {
            "id": orderId
        },
        UpdateExpression: "set orderCurrentStatus = :s",
        ExpressionAttributeValues: {
            ":s": orderStatus
        },
        ReturnValues: "UPDATED_NEW"
        };
        (async () => {
    await updateItemDb(params);
    await publishMessage("{\"orderID\":\""+orderId+"\",\"customerId\":\""+customerId+"\",\"orderStatus\":\""+orderStatus+"\"}");
})();
      //  await updateItemDb(params);
    }
  }, delay);

};

