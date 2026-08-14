const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const source = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, 'ArtSource/aetherion-unit-progression.png');

const unitGrid = [
  ['Voidwalker Legion', 'Riftblade Vanguard', 'Chrono Praetorian'],
  ['Nova Guard', 'Phasebound Exarch', 'Singularity Titan'],
  ['Reality Breaker', 'Quantum Fabricator', 'Worldshaper Architect']
];

async function main() {
  if (!fs.existsSync(source)) throw new Error(`Sprite sheet not found: ${source}`);
  const metadata = await sharp(source).metadata();
  const widths = [
    Math.floor(metadata.width / 3),
    Math.floor(metadata.width / 3),
    metadata.width - (2 * Math.floor(metadata.width / 3))
  ];
  const heights = [
    Math.floor(metadata.height / 3),
    Math.floor(metadata.height / 3),
    metadata.height - (2 * Math.floor(metadata.height / 3))
  ];
  const lefts = [0, widths[0], widths[0] + widths[1]];
  const tops = [0, heights[0], heights[0] + heights[1]];
  const outputDirectory = path.join(root, 'Images/TileSets/AbsoluteUnits/Units');
  fs.mkdirSync(outputDirectory, { recursive: true });

  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const name = unitGrid[row][column];
      await sharp(source)
        .extract({ left: lefts[column], top: tops[row], width: widths[column], height: heights[row] })
        .resize(192, 192, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDirectory, `${name}.png`));
    }
  }
  console.log(`Created ${unitGrid.flat().length} distinct unit sprites from ${metadata.width}x${metadata.height} source art.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
