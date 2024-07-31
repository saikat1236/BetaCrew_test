const fs = require('fs');

module.exports.handleData = (data) => {
  let offset = 0;
  const packets = [];

  // Parse each packet from the received data
  while (offset + 13 <= data.length) {
    const symbol = data.toString('ascii', offset, offset + 4).trim();
    const buysellindicator = data.toString('ascii', offset + 4, offset + 5);
    const quantity = data.readInt32BE(offset + 5);
    const price = data.readInt32BE(offset + 9);
    const packetSequence = data.readInt32BE(offset + 13);

    // Collect packet information
    packets.push({
      symbol,
      buysellindicator,
      quantity,
      price,
      packetSequence,
    });

    offset += 17; // Move to next packet (adjusted for 17 bytes)
  }

  // Write the packets to JSON file
  fs.writeFile('./data/stock_data.json', JSON.stringify(packets, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data successfully written to stock_data.json');
    }
  });
};
