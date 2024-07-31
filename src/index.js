const net = require('net');
const config = require('./config');
const dataHandler = require('./dataHandler');

// Establish connection to the server
const client = new net.Socket();
client.connect(config.PORT, config.HOST, () => {
  console.log('Connected to BetaCrew Exchange Server');

  // Send request to stream all packets
  const requestBuffer = Buffer.alloc(1);
  requestBuffer.writeInt8(1); // CallType 1 for streaming all packets
  client.write(requestBuffer); // I-am-autogenerated
});

client.on('data', (data) => {
  console.log('Data received from server:', data);
  dataHandler.handleData(data);
});

client.on('close', () => {
  console.log('Connection closed by server');
});

client.on('error', (err) => {
  console.error('An error occurred:', err);
});

client.on('timeout', () => {
  console.error('Connection timed out');
});
client.setTimeout(10000); // Set timeout to 10 seconds
