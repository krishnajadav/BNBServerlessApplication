'use strict';

const aws = require('aws-sdk');
var uuid = require('uuid');
const moment = require("moment");


exports.handler = async (event, context) => {
  const docClient = new aws.DynamoDB.DocumentClient();
     let requestedService = event.currentIntent.slots.menu;
 
    if(requestedService === 'menu'){
   	const params = {"TableName": "menuItems", "ProjectionExpression" : "name"}
    const data = await docClient.scan(params).promise()
    const stringData = JSON.stringify(data.Items);
    var menu = event.currentIntent.slots.menu;
    
    return {
					"dialogAction": 
					{
							"type": "Close",
							"fulfillmentState": "Fulfilled",
							"message": {
							"contentType": "PlainText",
							"content": "Here is our Breakfast menu"+stringData,
							}
							
					}
					}
   	
   }
   else
   {
 	
   	const docClient = new aws.DynamoDB.DocumentClient();
   	
   	const orderPlacedTime =moment().format("YYYY-DD-MM: HH:mm:ss")
	const orderReadyTime = moment().add(20, 'minutes').format("YYYY-DD-MM: HH:mm:ss");
	var itemName = event.currentIntent.slots.itemName;
	var quantity = event.currentIntent.slots.quantity;
	var emailAdd = event.currentIntent.slots.emailAdd;
    await docClient.put({TableName : 'orders',Item: {id:uuid.v1(), order:itemName, orderPlacedBy: emailAdd,orderPlacedTime :orderPlacedTime,orderReadyTime:orderReadyTime}}).promise();
	
	return {
					"dialogAction": 
					{
							"type": "Close",
							"fulfillmentState": "Fulfilled",
							"message": {
							"contentType": "PlainText",
							"content": "Your order for "+quantity+"  "+itemName+ " is placed and will be ready by --> "+orderReadyTime,
							}
							
					}
					}
   	
   	
   	
   }
	

};