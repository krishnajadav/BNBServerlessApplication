var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "ASIAZSJWKMQSKV6WFHYS",
    secretAccessKey: "DXBiO6prbVr7JblMUzgzR4yss64R45aF1ltXPxhI",
    sessionToken: "FwoGZXIvYXdzEDYaDFPkxIK4pbLY69vdHSLAAVgwcMEK+2J4DFW70YIV+CT0M/bcdHCtKV4nU/C46InY3NpdQ71Uo+u9gwyBwBvw1d3Gv7AvilqU0Tj/WHKMBMpYdocZ6Y5THamvD8NNuVa0OwYn+U7p5Mr/FOeyqqzEDweU3zlF0dHU7FlNTUgI0E06bo/jT8bQa1xxwkCHz5MfB81jl9Z1ljP5yI5fGTc+V7c/Mw/IDb73KUP7KnlHYE6rId/AdhmO5wbkAgWOqmDiHWavQaDHJQn0biJUSdshhiirgu6WBjItaHf4LZsP0o7Sx7yLhzOwbt8wPJcW9xOM7UZJKgFXAGLSef1X3Or4rBFLE8lZ"
  });
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    apiVersion: '2012-08-10'
});

//reference taken from - https://www.fernandomc.com/posts/eight-examples-of-fetching-data-from-dynamodb-with-node/
//function to get frequency of an existing item from DynamoDB
async function getMenu(params) {
    return new Promise(function(resolve, reject) {
        ddb.scan(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                var menu = "{\"menu\":[";
               
                data.Items.forEach(function (element, index, array) {
                   console.log(element);
                   var id =  "{\"id\":\"" +element.id.S+"\",";
                   var name =  "\"name\":\"" +element.name.S+"\",";
                   var preparationTime =  "\"preparationTime\":\"" +element.preparationTime.S+"\",";
                   var price =  "\"price\":\"" +element.price.S+"\"";

                   var menuItem = id+name+preparationTime+price+"},";
                   menu = menu + menuItem;
                  });
                  menu= menu.slice(0,-1);
                resolve(menu+"]}");
            }
        })
    });
}

exports.getMenu = (req, res) => {
  
    const params = {
        TableName: "menu",
      };
    
    (async () => {
       var menu = await getMenu(params); 
       res.setHeader("Content-Type", "application/json");
       res.setHeader('Access-Control-Allow-Origin', "*");
       res.setHeader('Access-Control-Allow-Methods', "*");
       res.status(200).send(menu);
    })();
   
};
