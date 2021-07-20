const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {


  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });
  
  it("constructor sets command type", function() {
    let commandTest = new Command("STATUS_CHECK", 500);
    assert.strictEqual(commandTest.commandType, "STATUS_CHECK");
  });

  it("constructor sets a value passed in as the 2nd argument", function(){
    let valueTest = new Command("MOVE", 500);
    assert.strictEqual(valueTest.value, 500);
  });
  
  

});