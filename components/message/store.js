const db = require("mongoose");
const Model = require("./model");


db.Promise = global.Promise;
db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("[db] Conectada con exito");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessage(filterUser) {
  let filter = {};
  if (filterUser) {
    filter = { user: filterUser };
  }
  const messages = await Model.find(filter);
  return messages;
}

async function updateMessage(id, message) {
  const foundMessage = await Model.findById(id);
  foundMessage.message = message;
  const newMessage = await foundMessage.save();

  return newMessage;
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateMessage,
  //dalete: deleteMEssage
};
