const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('fireAlarm', (data) => {
    console.log('The office is on fire');
});

module.exports = emitter;

emitter.emit('fireAlarm');