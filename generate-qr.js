import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

async function createQR(url, logoPath, outputPath) {
    const qrDataUrl = await QRCode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
            dark: '#1a1a1a',
            light: '#ffffff',
        },
        width: 1024
    });

    const canvas = createCanvas(1024, 1024);
    const ctx = canvas.getContext('2d');
    const qrImage = await loadImage(qrDataUrl);
    ctx.drawImage(qrImage, 0, 0);

    const logo = await loadImage(logoPath);
    const logoSize = 256;
    const x = (canvas.width - logoSize) / 2;
    const y = (canvas.height - logoSize) / 2;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(x - 10, y - 10, logoSize + 20, logoSize + 20, 20);
    ctx.fill();

    ctx.drawImage(logo, x, y, logoSize, logoSize);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`QR Code updated for: ${url}`);
}

const url = 'https://donhawk77.github.io/colorado-coffee/';
const logo = path.join(process.cwd(), 'public/assets/logo.png');
const output = path.join(process.cwd(), 'public/assets/qr-code.png');

createQR(url, logo, output).catch(err => console.error(err));
