const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const atlasWidth = 2048;
const atlasHeight = 2048;
const padding = 8;

const units = JSON.parse(fs.readFileSync(path.join(root, 'jsons/Units.json'), 'utf8'));

const sourceAssets = [
  ['ArtSource/nation.svg', 'Images/NationIcons/Aetherion Ascendancy.png', 160],
  ['ArtSource/leader.svg', 'Images/LeaderIcons/Archon Nyra Voss.png', 256],
  ['ArtSource/quantum_core.svg', 'Images/BuildingIcons/Quantum Core.png', 200],
  ['ArtSource/stellar_forge.svg', 'Images/BuildingIcons/Stellar Forge.png', 200],
  ['ArtSource/omega_nexus.svg', 'Images/BuildingIcons/Omega Nexus.png', 200],
  ['ArtSource/ascendant_physics.svg', 'Images/TechIcons/Ascendant Physics.png', 200]
];

const sigils = [
  ['Images/BuildingIcons/Genesis Crucible.png', '#54f5ad', '#fff3a3', '<path d="M100 42C72 68 62 96 74 128c7 18 18 29 26 34 9-5 20-16 27-34 12-32 2-60-27-86Z"/><path d="M64 148h72v14H64z"/>'],
  ['Images/BuildingIcons/Infinite Treasury.png', '#ffd35a', '#8af7ff', '<path d="M54 74h92l-12 78H66L54 74Zm18-26h56l14 20H58l14-20Z"/><circle cx="100" cy="108" r="20"/>'],
  ['Images/BuildingIcons/Continuum Basilica.png', '#d78cff', '#8af7ff', '<path d="M100 34 54 78v78h92V78l-46-44Zm0 28 21 20-21 20-21-20 21-20Z"/><path d="M84 112h32v44H84z"/>'],
  ['Images/BuildingIcons/Eternal Archive.png', '#8af7ff', '#b499ff', '<path d="M48 50h72c18 0 32 14 32 32v72H80c-18 0-32-14-32-32V50Z"/><path d="M72 72h56v12H72zm0 28h56v12H72zm0 28h40v12H72z"/>'],
  ['Images/BuildingIcons/Worldheart Engine.png', '#ff6e8a', '#8af7ff', '<path d="M100 164C73 142 49 119 49 84c0-21 14-36 33-36 9 0 16 4 18 10 3-6 10-10 19-10 19 0 33 15 33 36 0 35-24 58-52 80Z"/><circle cx="100" cy="100" r="26"/>'],
  ['Images/BuildingIcons/Omniversal Exchange.png', '#fff3a3', '#61d9ff', '<circle cx="100" cy="100" r="58"/><path d="m100 42 18 38 40 20-40 20-18 38-18-38-40-20 40-20 18-38Z"/>'],
  ['Images/ImprovementIcons/Genesis Garden.png', '#54f5ad', '#fff3a3', '<path d="M100 160V82"/><path d="M98 98C66 94 50 75 48 48c31-2 51 14 54 46m0 29c32-4 48-23 50-50-31-2-51 14-54 46"/><circle cx="100" cy="48" r="16"/>'],
  ['Images/ImprovementIcons/Continuum Spire.png', '#8af7ff', '#d78cff', '<path d="m100 30 32 104-32 36-32-36 32-104Z"/><path d="m52 142 48-28 48 28-48 28-48-28Z"/>'],
  ['Images/ReligionIcons/Continuum Ascendance.png', '#8af7ff', '#d78cff', '<circle cx="100" cy="100" r="60"/><circle cx="100" cy="100" r="34"/><path d="m100 30 12 34 34 12-34 12-12 34-12-34-34-12 34-12 12-34Z"/>'],
  ['Images/ReligionIcons/Quantum Revelation.png', '#8af7ff', '#fff3a3', '<path d="m100 34 18 45 48 21-48 21-18 45-18-45-48-21 48-21 18-45Z"/><circle cx="100" cy="100" r="18"/>'],
  ['Images/ReligionIcons/Tithe of Stars.png', '#ffd35a', '#8af7ff', '<circle cx="100" cy="100" r="60"/><path d="m100 45 13 37 39 2-30 24 10 38-32-22-32 22 10-38-30-24 39-2 13-37Z"/>'],
  ['Images/ReligionIcons/Genesis Communion.png', '#54f5ad', '#8af7ff', '<circle cx="70" cy="86" r="27"/><circle cx="130" cy="86" r="27"/><path d="M46 154c3-31 22-48 54-48s51 17 54 48H46Z"/>'],
  ['Images/ReligionIcons/Ascendant Crusade.png', '#ff6e8a', '#fff3a3', '<path d="m100 34 42 18v42c0 33-17 57-42 72-25-15-42-39-42-72V52l42-18Z"/><path d="M92 56h16v34h28v16h-28v42H92v-42H64V90h28V56Z"/>'],
  ['Images/ReligionIcons/Infinite Resonance.png', '#d78cff', '#8af7ff', '<circle cx="100" cy="100" r="16"/><circle cx="100" cy="100" r="38"/><circle cx="100" cy="100" r="62"/>']
];

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function sigilSvg(primary, accent, glyph) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="core"><stop stop-color="${accent}"/><stop offset="1" stop-color="${primary}"/></radialGradient>
      </defs>
      <g fill="none" stroke="${primary}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)">${glyph}</g>
      <circle cx="100" cy="100" r="9" fill="url(#core)" filter="url(#glow)"/>
    </svg>`);
}

async function renderSourceAssets(outputs) {
  for (const [source, output, size] of sourceAssets) {
    const outputPath = path.join(root, output);
    ensureParent(outputPath);
    await sharp(path.join(root, source))
      .resize(size, size, { fit: 'contain' })
      .png()
      .toFile(outputPath);
    outputs.push(output);
  }
}

async function renderSigils(outputs) {
  for (const [output, primary, accent, glyph] of sigils) {
    const outputPath = path.join(root, output);
    ensureParent(outputPath);
    await sharp(sigilSvg(primary, accent, glyph)).png().toFile(outputPath);
    outputs.push(output);
  }
}

async function renderUnitIcons(outputs) {
  for (const unit of units) {
    const sprite = `Images/TileSets/AbsoluteUnits/Units/${unit.name}.png`;
    const icon = `Images/UnitIcons/${unit.name}.png`;
    const spritePath = path.join(root, sprite);
    const iconPath = path.join(root, icon);
    if (!fs.existsSync(spritePath)) throw new Error(`Missing generated sprite: ${sprite}`);
    ensureParent(iconPath);
    await sharp(spritePath)
      .resize(200, 200, { fit: 'contain' })
      .png()
      .toFile(iconPath);
    outputs.push(icon, sprite);
  }
}

async function packAtlas(outputs) {
  const regions = [];
  let x = padding;
  let y = padding;
  let rowHeight = 0;

  for (const output of [...new Set(outputs)]) {
    const metadata = await sharp(path.join(root, output)).metadata();
    const width = metadata.width;
    const height = metadata.height;
    if (x + width + padding > atlasWidth) {
      x = padding;
      y += rowHeight + padding;
      rowHeight = 0;
    }
    if (y + height + padding > atlasHeight) throw new Error(`Atlas overflow while packing ${output}`);
    regions.push({ output, x, y, width, height });
    x += width + padding;
    rowHeight = Math.max(rowHeight, height);
  }

  await sharp({
    create: {
      width: atlasWidth,
      height: atlasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(regions.map(region => ({
      input: path.join(root, region.output),
      left: region.x,
      top: region.y
    })))
    .png()
    .toFile(path.join(root, 'game.png'));

  const atlas = [
    'game.png',
    `size: ${atlasWidth},${atlasHeight}`,
    'format: RGBA8888',
    'filter: Linear,Linear',
    'repeat: none'
  ];
  for (const region of regions) {
    const key = region.output.replace(/^Images\//, '').replace(/\.png$/, '');
    atlas.push(
      key,
      '  rotate: false',
      `  xy: ${region.x}, ${region.y}`,
      `  size: ${region.width}, ${region.height}`,
      `  orig: ${region.width}, ${region.height}`,
      '  offset: 0, 0',
      '  index: -1'
    );
  }
  fs.writeFileSync(path.join(root, 'game.atlas'), `${atlas.join('\n')}\n`);
}

async function main() {
  const outputs = [];
  await renderSourceAssets(outputs);
  await renderSigils(outputs);
  await renderUnitIcons(outputs);
  await sharp(path.join(root, 'ArtSource/preview.svg'))
    .resize(1200, 630)
    .png()
    .toFile(path.join(root, 'preview.png'));
  await packAtlas(outputs);
  console.log(`Rendered ${new Set(outputs).size} atlas regions into game.png.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
