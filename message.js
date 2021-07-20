class Message {
  constructor(name, commands) {
    this.commands = commands;
    this.name = name;
   
    if (!name) {
      throw Error("Name required.");
    };
    };
};
module.exports = Message;