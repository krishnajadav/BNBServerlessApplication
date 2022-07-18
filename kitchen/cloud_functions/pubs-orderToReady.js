var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "ASIAZSJWKMQSIS5MWKLI",
    secretAccessKey: "U5VRJBU3kyGmkIHByvjkUiFRLQbYPg5Wa4LBj07j",
    sessionToken: "FwoGZXIvYXdzEL7//////////wEaDME1DDIwHhJTVvmu4iLAAdTc4LrOWKdRQ7fA1AMN9FHRh1dSnr2vyK0KiCgFXFGOW/SPZe0xiYyG86AbOl6twmd8xK2jmPBVC9H4Ustc4dr06jXkT1yhXzBCgdRWPNjEt6H9Ncubxm0y51GSxE3XXgSJE2Jk75YOhptRPM8rlekFolpyqQevBHDLfltx0ywlEpC7Q7EWm57odfuTk/361vZx46ny945qa3LdzAyAOwsmlbgIx0wGks+8q/ya9/G/INllFv1QxAN9/k55WwF5nyiXxtOWBjItguTkdN98Cg3U/WPJk3r6CymX1w3T00p2tERtMVUcE5lR81jLke4fx+koCiM/"
  });

AWS.config.update({
    region: "us-east-1"
});
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
exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'Hello, World';
  console.log(message);

  var timedelay = message.split(',')[0];
  var delay = timedelay*60*1000;
  setTimeout(function() {
    var orderId = message.split(',')[1];
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
})();
      //  await updateItemDb(params);
    }
  }, delay);

};

