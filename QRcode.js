const qr = require("qrcode");
const fs = require("fs");
const QRCodeReader = require('qrcode-reader');
const Jimp = require('jimp');
const readline = require('readline');

let numberOfQRCode;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of QR codes to generate: ', (input) => {
  // Convert the input string to an integer
  numberOfQRCode = parseInt(input);

  // Check if the input is a valid number
  if (!isNaN(numberOfQRCode)) {
    const baseUrl = 'https://website/resturant/table/';
    const outputPath = 'tablesQR';
    generateAndSaveQRCodes(numberOfQRCode, baseUrl, outputPath);
  } else {
    console.log('Invalid input. Please enter a valid number.');
  }

  // Close the readline interface
  rl.close();
});
  
async function generateQRCodeImage(url, filename) {
  try {
    const qrCode = await qr.toFile(filename, url);
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code image:', error);
    throw error;
  }
}

// to decode 
async function decodeQRCodeImage(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    const qrCodeReader = new QRCodeReader();
    const result = await new Promise((resolve, reject) => {
      qrCodeReader.callback = (err, value) => (err ? reject(err) : resolve(value));
      qrCodeReader.decode(image.bitmap);
    });
    return result.result;
  } catch (error) {
    console.error('Error decoding QR code image:', error);
    throw error;
  }
}


async function generateAndSaveQRCodes(numberOfCodes, baseUrl, outputPath) {
  try {
    for (let i = 0; i < numberOfCodes; i++) {
      const url = `${baseUrl}${i}`;
      const filename = `${outputPath}/qr_code_${i}.png`;
      await generateQRCodeImage(url, filename);
      console.log(`Generated QR Code ${i}: ${url}`);
    }
    console.log("All QR codes generated and saved successfully!");
  } catch (error) {
    console.error('Error generating and saving QR codes:', error);
    throw error;
  }
}


// const numberOfQRCode = number;
// const baseUrl = 'https://website/resturant/table/';
// const outputPath = 'tablesQR';
const qrCodeToDecode = 'tablesQR/qr_code_0.png';

// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath);
// }

// generateAndSaveQRCodes(numberOfQRCode, baseUrl, outputPath);

// Example decoding
// decodeQRCodeImage(qrCodeToDecode)
//   .then((decodedData) => {
//     console.log('Decoded QR Code Data:', decodedData);
//   })
//   .catch((error) => {
//     console.error('Error decoding QR code:', error);
//   });