const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", 
  function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      });
  });

  it("constructor sets name", function(){
    let nameTest = new Message("name", [] );
    assert.strictEqual(nameTest.name, "name");
  });

  it("contains a commands array passed into the constructor as 2nd argument", function(){
    let commandsArray =   [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let arrayTest = new Message("name", commandsArray);
    assert.strictEqual(arrayTest.commands, commandsArray);
  });
  });