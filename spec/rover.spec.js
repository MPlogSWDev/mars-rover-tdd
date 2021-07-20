const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');
const Rover = require('../rover.js');

describe("Rover class", function(){
  
  it("constructor sets position and default values for mode and generatorWatts", function(){
   
    let positionTest = new Rover(98382);
    assert.strictEqual(positionTest.position, 98382);
    assert.strictEqual(positionTest.mode, 'NORMAL');
    assert.strictEqual(positionTest.generatorWatts, 110);
   });

  it("response returned by receiveMessage contains name of message", function(){
    
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    
    assert.strictEqual(response.message, "Test message with two commands");
    
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
     
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
  
    assert.strictEqual(response.results.length, 2)

  })

  it("responds correctly to status check command", function(){
    let commands = [ new Command('STATUS_CHECK')];
    let message = new Message('Status check input', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    
    assert.deepEqual(response.results[0], 
      {
        completed: true,
        roverStatus: {
      position: 98382, 
      mode: "NORMAL", 
      generatorWatts: 110 
      }

    })
  })


    

  it("responds correctly to mode change command", function(){
    
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Changing the mode', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
     
    
    assert.strictEqual(response.results[0].completed, true)
    assert.strictEqual(rover.mode, "LOW_POWER")

  })

  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',65456)];
    let message = new Message('Changing the mode', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);

    assert.strictEqual(response.results[1].completed, false)
    assert.strictEqual(rover.position, 98382)

  })

  it("responds with position for move command", function(){
    let commands = [new Command('MOVE', 56454)];
    let message = new Message('Move PLease', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);

    assert.strictEqual(rover.position, 56454)

  })


})