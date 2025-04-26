const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 19, 32, 38, 48, 64, 128];
const inputPng = path.join(__dirname, '../app/images/icon.png');
const outputDir = path.join(__dirname, '../app/images');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate PNG files for each size
sizes.forEach(size => {
  sharp(inputPng)
    .resize(size, size)
    .png()
    .toFile(path.join(outputDir, `icon-${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch(err => console.error(`Error generating ${size}x${size} icon:`, err));
}); 