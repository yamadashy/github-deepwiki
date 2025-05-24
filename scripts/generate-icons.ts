import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const sizes: number[] = [16, 19, 32, 38, 48, 64, 128];
const inputPng: string = path.join(__dirname, '../app/images/icon.png');
const outputDir: string = path.join(__dirname, '../app/images');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate PNG files for each size
const generateIcons = async (): Promise<void> => {
  try {
    await Promise.all(
      sizes.map(async (size: number) => {
        try {
          await sharp(inputPng)
            .resize(size, size)
            .png()
            .toFile(path.join(outputDir, `icon-${size}.png`));
          console.log(`Generated ${size}x${size} icon`);
        } catch (err) {
          console.error(`Error generating ${size}x${size} icon:`, err);
        }
      })
    );
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
};

// Execute icon generation
generateIcons();
