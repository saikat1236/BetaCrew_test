function requestData(client) {
    const requestCode = Buffer.from([1]); // Request all packets code
    client.write(requestCode);
  }
  
  module.exports = { requestData };
  