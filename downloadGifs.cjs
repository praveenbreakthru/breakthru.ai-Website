const fs = require('fs');
const https = require('https');
const path = require('path');

const gifs = [
  { url: 'https://www.echelonedge.com/wp-content/themes/echelon/assets/img/echelon-data-quipo.gif', name: 'echelon-data-quipo.gif' },
  { url: 'https://liveimages.algoworks.com/new-algoworks/wp-content/uploads/2022/06/22140355/effective-product-team.gif', name: 'effective-product-team.gif' },
  { url: 'https://talentpair.com/wp-content/uploads/2023/03/main_animation_dan.gif', name: 'main_animation_dan.gif' },
  { url: 'https://miro.medium.com/1*3dxV_CF-kCFRXNCmaXcBMA.gif', name: 'bank-heist.gif' },
  { url: 'https://cdn.dribbble.com/userupload/29647510/file/original-6c41bc159984aa848eec332e1d774c8d.gif', name: 'family-office-dribbble.gif' },
  { url: 'https://cdn.pixabay.com/animation/2023/05/16/19/08/19-08-28-374_512.gif', name: 'engineering-pixabay.gif' },
  { url: 'https://jnnce.ac.in/jnndemo/aiml.gif', name: 'aiml.gif' },
  { url: 'https://s13.gifyu.com/images/bmPda.gif', name: 'breakthru-labs.gif' },
  { url: 'https://giffiles.alphacoders.com/112/11291.gif', name: 'chatbot-robot.gif' },
  { url: 'https://cdnl.iconscout.com/lottie/premium/thumb/fintech-animation-gif-download-10695981.gif', name: 'fintech-animation.gif' },
  { url: 'https://cdn.dribbble.com/userupload/14080634/file/original-8ac881a57fd7ef31b113e0acc2aa91e3.gif', name: 'dribbble-manufacturing.gif' },
  { url: 'https://whizardapi.com/wp-content/uploads/2021/06/5ceb94307a0da88913675942_Roaming.gif', name: 'roaming.gif' }
];

const dir = path.join(__dirname, 'public', 'gifs');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
         const redirectUrl = new URL(response.headers.location, url).href;
         https.get(redirectUrl, (res) => {
            res.pipe(file);
            file.on('finish', () => { file.close(resolve); });
         }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
      } else {
         response.pipe(file);
         file.on('finish', () => { file.close(resolve); });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const gif of gifs) {
    const dest = path.join(dir, gif.name);
    console.log(`Downloading ${gif.name}...`);
    try {
      await download(gif.url, dest);
      console.log(`Successfully downloaded ${gif.name}`);
    } catch (e) {
      console.error(`Failed to download ${gif.name}:`, e);
    }
  }
  console.log('All downloads completed.');
}

run();
