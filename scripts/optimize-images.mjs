import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const backupDir = path.resolve('public/images/_originals');

// Ensure backup dir exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '_originals') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function optimize() {
  const files = getAllFiles(imagesDir);
  console.log(`Found ${files.length} images to audit and optimize...`);

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const filePath of files) {
    const relPath = path.relative(imagesDir, filePath);
    const backupPath = path.join(backupDir, relPath);
    const backupSubdir = path.dirname(backupPath);

    // Backup if not already backed up
    if (!fs.existsSync(backupSubdir)) {
      fs.mkdirSync(backupSubdir, { recursive: true });
    }
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    const beforeSize = fs.statSync(filePath).size;
    totalBefore += beforeSize;

    const ext = path.extname(filePath).toLowerCase();
    const webpPath = filePath.substring(0, filePath.length - ext.length) + '.webp';

    let optimizedBuffer;
    let webpBuffer;

    if (ext === '.png') {
      // Compress PNG preserving alpha channel
      optimizedBuffer = await sharp(backupPath)
        .png({ compressionLevel: 9, effort: 10, quality: 90 })
        .toBuffer();

      // Also generate WebP version
      webpBuffer = await sharp(backupPath)
        .webp({ quality: 90, effort: 6 })
        .toBuffer();
    } else {
      // JPEG optimization
      optimizedBuffer = await sharp(backupPath)
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toBuffer();

      // Also generate WebP version
      webpBuffer = await sharp(backupPath)
        .webp({ quality: 82, effort: 6 })
        .toBuffer();
    }

    // Write optimized original format
    fs.writeFileSync(filePath, optimizedBuffer);
    const afterSize = optimizedBuffer.length;
    totalAfter += afterSize;

    // Write WebP sibling
    fs.writeFileSync(webpPath, webpBuffer);

    const savingPct = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
    results.push({
      file: relPath,
      before: (beforeSize / 1024).toFixed(1) + ' KB',
      after: (afterSize / 1024).toFixed(1) + ' KB',
      webp: (webpBuffer.length / 1024).toFixed(1) + ' KB',
      saved: savingPct + '%'
    });
  }

  console.table(results);
  const totalBeforeMB = (totalBefore / (1024 * 1024)).toFixed(2);
  const totalAfterMB = (totalAfter / (1024 * 1024)).toFixed(2);
  const totalSavedPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(`\n========================================`);
  console.log(`Total Before: ${totalBeforeMB} MB`);
  console.log(`Total After (PNG/JPG): ${totalAfterMB} MB`);
  console.log(`Overall Savings: ${totalSavedPct}% reduction`);
  console.log(`Originals preserved safely in: public/images/_originals/`);
  console.log(`========================================\n`);
}

optimize().catch(err => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
