const Model = require("./model");


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

async function removeMessage(id) {
  return await Model.findByIdAndDelete(id);
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateMessage,
  remove: removeMessage,
};
