const store = require("./store");
const socket = require("../../socket").socket;

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[messageController] No hay usuario o mensaje");
      return reject("Los datos son incorrectos");
    }

    let fileUrl = "";
    if (file) {
      fileUrl = "http://localhost:3000/app/files/" + file.filename;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };
    store.add(fullMessage);
    socket.io.emit("message", fullMessage);
    resolve(fullMessage);
  });
}

function getMessage(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (id && message) {
      try {
        const data = await store.update(id, message);
        resolve(data);
      } catch (error) {
        reject(new Error(error));
      }
    } else {
      reject(new Error("Missing params"));
    }
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("Id invalido");
    }
    try {
      store.remove(id);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  addMessage,
  getMessage,
  updateMessage,
  deleteMessage,
};
