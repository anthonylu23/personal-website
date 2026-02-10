import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PHOTOS_SRC = path.resolve('src/data/photos')
const PHOTOS_OUT = path.resolve('public/photos')

const GALLERY_MAX = 2400
const GALLERY_QUALITY = 80
const THUMB_MAX = 1200
const THUMB_QUALITY = 75

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png'])

async function processImage(srcPath, outDir, baseName) {
  const galleryOut = path.join(outDir, `${baseName}.webp`)
  const thumbOut = path.join(outDir, `${baseName}_thumb.webp`)

  const srcStat = fs.statSync(srcPath)

  // Skip if outputs exist and are newer than source
  const galleryFresh =
    fs.existsSync(galleryOut) &&
    fs.statSync(galleryOut).mtimeMs >= srcStat.mtimeMs
  const thumbFresh =
    fs.existsSync(thumbOut) &&
    fs.statSync(thumbOut).mtimeMs >= srcStat.mtimeMs

  if (galleryFresh && thumbFresh) {
    return { skipped: true }
  }

  const image = sharp(srcPath).rotate() // auto-rotate based on EXIF

  if (!galleryFresh) {
    await image
      .clone()
      .resize({ width: GALLERY_MAX, height: GALLERY_MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: GALLERY_QUALITY })
      .toFile(galleryOut)
  }

  if (!thumbFresh) {
    await image
      .clone()
      .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbOut)
  }

  return { skipped: false }
}

async function main() {
  const entries = fs.readdirSync(PHOTOS_SRC, { withFileTypes: true })
  const folders = entries.filter((e) => e.isDirectory())

  let totalProcessed = 0
  let totalSkipped = 0
  const manifest = {}

  for (const folder of folders) {
    const folderSrc = path.join(PHOTOS_SRC, folder.name)
    const folderOut = path.join(PHOTOS_OUT, folder.name)
    fs.mkdirSync(folderOut, { recursive: true })

    const files = fs.readdirSync(folderSrc)
    const folderImages = []

    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      if (!IMAGE_EXTS.has(ext)) continue

      const baseName = path.basename(file, path.extname(file))
      const srcPath = path.join(folderSrc, file)

      try {
        const { skipped } = await processImage(srcPath, folderOut, baseName)
        if (skipped) {
          totalSkipped++
        } else {
          totalProcessed++
          console.log(`  optimized: ${folder.name}/${file}`)
        }
        folderImages.push(baseName)
      } catch (err) {
        console.error(`  FAILED: ${folder.name}/${file} - ${err.message}`)
      }
    }

    if (folderImages.length > 0) {
      folderImages.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      manifest[folder.name] = folderImages
    }
  }

  const manifestPath = path.resolve('src/data/photo-manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\nManifest written to ${manifestPath}`)
  console.log(`Done. Processed: ${totalProcessed}, Skipped (up-to-date): ${totalSkipped}`)
}

main()
