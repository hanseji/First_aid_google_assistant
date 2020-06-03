"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var echoText =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";

  var infoText =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.info
      ? req.body.queryResult.parameters.info
      : "Seems like some problem. Speak again.";


  //하는 방법 알려줌
  if(infoText == "알려줘" || infoText == "알려줄래" || infoText == "어떻게해" || infoText == "어떻게"){
    var speechResponse = {
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: "Here's an example of a browsing carousel."
                }
              },
            {
              "basicCard": {
                "title": "심폐소생술 하는 방법",
                "subtitle": "This is a subtitle",
                "formattedText": "This is a basic card.  Text in a basic card can include \"quotes\" and\n    most other unicode characters including emojis.  Basic cards also support\n    some markdown formatting like *emphasis* or _italics_, **strong** or\n    __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other\n    things like line  \nbreaks",
                "image": {
                  "url": "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
                  "accessibilityText": "Image alternate text"
                },
                "buttons": [
                  {
                    "title": "This is a button",
                    "openUrlAction": {
                      "url": "https://assistant.google.com/"
                    }
                  }
                ],
                "imageDisplayOptions": "CROPPED"
              }
            },
            {
              "simpleResponse": {
                "textToSpeech": "Which response would you like to see next?"
              }
            }
            ]
          }
        }
      }
    };
  }
  else {
    var speechResponse = {
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: "Here's an example of a browsing carousel."
                }
              },
            {
              "basicCard": {
                "title": echoText,
                "subtitle": "This is a subtitle",
                "formattedText": "This is a basic card.  Text in a basic card can include \"quotes\" and\n    most other unicode characters including emojis.  Basic cards also support\n    some markdown formatting like *emphasis* or _italics_, **strong** or\n    __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other\n    things like line  \nbreaks",
                "image": {
                  "url": "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
                  "accessibilityText": "Image alternate text"
                },
                "buttons": [
                  {
                    "title": "This is a button",
                    "openUrlAction": {
                      "url": "https://assistant.google.com/"
                    }
                  }
                ],
                "imageDisplayOptions": "CROPPED"
              }
            },
            {
              "simpleResponse": {
                "textToSpeech": "Which response would you like to see next?"
              }
            }
            ]
          }
        }
      }
    };
  }
  
  
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: echoText,
    echoText: echoText,
    displayText: echoText,
    source: "webhook-echo-sample"
  });
});

/*
restService.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});
*/

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
