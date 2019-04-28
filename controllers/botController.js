

const { MessengerUser } = require("../config/sequalize")
const config = require("../config")
const axios = require("axios")
const getChallenge = (req, res, err) => {
    res.send(req.query["hub.challenge"])
}

/*

@desc Save messeger user To database
@args user id 
@return Null

*/
const saveUser = (userId) => {
    MessengerUser.create({ user_id: userId }).then((user) => {
        console.log("SAVED ", userId)
    })
        .catch((e) => {

        })
}


/*

@desc send message To user 
@args user id and message json (array)
@return Null

*/

const sendMessage = (userId, messageJson, i) => {
    if (i == messageJson.length) {
        return
    }
    axios.post("https://graph.facebook.com/v2.6/me/messages?access_token=" + config.accessToken, {
        recipient: {
            id: userId
        },
        message: messageJson[i],

    }).then((response) => {

        i++;
        sendMessage(userId, messageJson, i)

 
    })
}



const hooks = (req, res, err) => {

    if (req.body.object == "page") {
        let entries = req.body.entry;
        entries.forEach((entry) => {
            let messaging = entry.messaging
            messaging.forEach((message) => {
                let senderId = message.sender.id;
                console.log(message)

                if (!!message.postback) {
                    if (message.postback.payload == "<GET_STARTED_PAYLOAD>") {
                        sendMessage(senderId, [{ text: "Welcome To Airbot @by AirBot Team" }, {
                            "attachment": {
                                "type": "image",
                                "payload": {
                                    "url": "https://i.ibb.co/CKj0PWn/Group-99.png",
                                    "is_reusable": true
                                }
                            }
                        }
                        ], 0)
                        saveUser(senderId)

                    }
                    if(message.postback.payload=="SIGN_UP"){
                        let template={
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        text: "sign up now with the best air Platform ",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://www.messenger.com",
            "title":"signup now"
          }
        ]
      }
    }
  }
                         sendMessage(senderId, [template
                        ], 0)
                    }

                }

            })
        });
    }
    res.send(200)
}
module.exports = {
    getChallenge,
    hooks,
    sendMessage
}