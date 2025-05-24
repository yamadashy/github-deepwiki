import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const sizes: number[] = [16, 19, 32, 38, 48, 64, 128];
const inputPng: string = path.join(__dirname, '../app/images/icon.png');
const outputDir: string = path.join(__dirname, '../app/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach(size => {
  sharp(inputPng)
    .resize(size, size)
    .png()
    .toFile(path.join(outputDir, `icon-${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch((err: Error) => console.error(`Error generating ${size}x${size} icon:`, err));
});
