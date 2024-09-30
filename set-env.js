const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

dotenv.config({ path: './variabili.env' });


const targetPath = './src/environments/environment.ts';
const envConfigFile = `export const environment = {
  production: false,
  apiUrl: 'https://localhost:8080',
  googleMapsApiKey: '${process.env.GOOGLE_MAPS_API_KEY}'
};
`;
fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Updated environment.ts with API key`);
  }
});
