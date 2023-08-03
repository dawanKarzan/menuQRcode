const qr = require("qrcode");
const fs = require("fs");
const QRCodeReader = require('qrcode-reader');
const Jimp = require('jimp');

let data = {
    "id": 1,
    "name": "name",
    "email": "email",
    "gender": "gender"
  };
  
  let stJson = JSON.stringify(data);
  
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
        const dataForQR = {
          ...data, // Use the common data from the 'data' variable
          table: i, // Add a unique field for each QR code (e.g., table number)
        };
        const stJson = JSON.stringify(dataForQR); // Stringify the data
  
        const url = `${baseUrl}${i}`;
        const filename = `${outputPath}/qr_code_${i}.png`;
        await generateQRCodeImage(url, stJson, filename); // Pass the 'stJson' to the generateQRCodeImage function
        console.log(`Generated QR Code ${i}: ${url}`);
      }
      console.log("All QR codes generated and saved successfully!");
    } catch (error) {
      console.error('Error generating and saving QR codes:', error);
      throw error;
    }
  }
  


const numberOfQRCode = 10;
const baseUrl = 'https://website/resturant/table/';
const outputPath = 'tablesQR';
const qrCodeToDecode = 'tablesQR/qr_code_0.png';

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

generateAndSaveQRCodes(numberOfQRCode, baseUrl, outputPath);

// Example decoding
// decodeQRCodeImage(qrCodeToDecode)
//   .then((decodedData) => {
//     console.log('Decoded QR Code Data:', decodedData);
//   })
//   .catch((error) => {
//     console.error('Error decoding QR code:', error);
//   });
