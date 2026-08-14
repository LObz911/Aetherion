const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertUnique(items, label) {
  const names = items.map(item => item.name);
  assert(new Set(names).size === names.length, `Duplicate ${label} name found`);
}

const nations = readJson('jsons/Nations.json');
const units = readJson('jsons/Units.json');
const buildings = readJson('jsons/Buildings.json');
const beliefs = readJson('jsons/Beliefs.json');
const religions = readJson('jsons/Religions.json');
const improvements = readJson('jsons/TileImprovements.json');
const techColumns = readJson('jsons/Techs.json');
const modOptions = readJson('jsons/ModOptions.json');
const atlases = readJson('Atlases.json');

assert(Array.isArray(nations) && nations.length === 1, 'Expected exactly one civilization');
assert(modOptions.isBaseRuleset === false, 'This project must remain an extension mod');

assertUnique(nations, 'nation');
assertUnique(units, 'unit');
assertUnique(buildings, 'building');
assertUnique(beliefs, 'belief');
assertUnique(improvements, 'improvement');
assert(new Set(religions).size === religions.length, 'Duplicate religion name found');

const nationNames = new Set(nations.map(nation => nation.name));
const aetherion = nations[0];
const requiredPowerUniques = [
  '[+999900]% Production when constructing [All] buildings [in all cities]',
  '[+999900]% Production when constructing [All] wonders [in all cities]',
  'May buy [All] units for [10] [Gold] [in all cities]',
  'May buy [All] buildings for [10] [Gold] [in all cities]',
  'May buy [All] buildings for [10] [Faith] [in all cities]',
  '[-99]% construction time for [All] improvements',
  '[+999800]% [Luxury] resource production',
  '[+999800]% [Strategic] resource production',
  '[+10000]% Strength <for [Military] units>',
  '[+50] Movement <for [Military] units>',
  '[-100]% unhappiness from the number of cities',
  '[-100]% Unhappiness from [Population] [in all cities]'
];
for (const unique of requiredPowerUniques) {
  assert(aetherion.uniques.includes(unique), `Missing requested civilization power: ${unique}`);
}

for (const unit of units) {
  assert(nationNames.has(unit.uniqueTo), `${unit.name} references unknown nation ${unit.uniqueTo}`);
}
for (const building of buildings) {
  assert(nationNames.has(building.uniqueTo), `${building.name} references unknown nation ${building.uniqueTo}`);
}
for (const improvement of improvements) {
  assert(nationNames.has(improvement.uniqueTo), `${improvement.name} references unknown nation ${improvement.uniqueTo}`);
}
assert(religions.includes(aetherion.favoredReligion), 'Favored religion is missing from Religions.json');
assert(
  aetherion.uniques.some(unique => unique.includes('+99999 Food') && unique.includes('+99999 Gold') && unique.includes('+99999 Culture') && unique.includes('+99999 Faith')),
  'Civilization must provide 99,999 Food, Gold, Culture and Faith per city'
);

const beliefTypes = new Set(['Pantheon', 'Founder', 'Follower', 'Enhancer']);
for (const belief of beliefs) {
  assert(beliefTypes.has(belief.type), `${belief.name} has invalid belief type ${belief.type}`);
}

const techs = techColumns.flatMap(column => column.techs || []);
assertUnique(techs, 'technology');
const availableTechs = new Set([
  'Agriculture',
  'Writing',
  'Pottery',
  'Currency',
  'Philosophy',
  'Archaeology',
  'Biology',
  'Electricity',
  'Construction',
  'Iron Working',
  'Steel',
  'Rifling',
  'Plastics',
  'Industrialization',
  'Nuclear Fusion',
  'Future Tech',
  ...techs.map(tech => tech.name)
]);

for (const unit of units) {
  assert(availableTechs.has(unit.requiredTech), `${unit.name} references unknown technology ${unit.requiredTech}`);
}
for (const building of buildings) {
  assert(availableTechs.has(building.requiredTech), `${building.name} references unknown technology ${building.requiredTech}`);
}
for (const improvement of improvements) {
  assert(availableTechs.has(improvement.techRequired), `${improvement.name} references unknown technology ${improvement.techRequired}`);
  assert(improvement.turnsToBuild === 0, `${improvement.name} must build in one turn`);
}
for (const tech of techs) {
  for (const prerequisite of tech.prerequisites || []) {
    assert(availableTechs.has(prerequisite), `${tech.name} references unknown prerequisite ${prerequisite}`);
  }
}

const baseUnits = new Set([
  'Warrior',
  'Swordsman',
  'Longswordsman',
  'Rifleman',
  'Infantry',
  'Giant Death Robot',
  'Worker',
  'Great Engineer'
]);
const baseBuildings = new Set([
  'Library',
  'Factory',
  'Granary',
  'Market',
  'Temple',
  'Museum',
  'Hospital',
  'Stock Exchange'
]);
for (const unit of units.filter(unit => unit.replaces)) {
  assert(baseUnits.has(unit.replaces), `${unit.name} replaces unexpected base unit ${unit.replaces}`);
}
for (const building of buildings.filter(building => building.replaces)) {
  assert(baseBuildings.has(building.replaces), `${building.name} replaces unexpected base building ${building.replaces}`);
}

const customUnitNames = new Set(units.map(unit => unit.name));
for (const unit of units.filter(unit => unit.upgradesTo)) {
  assert(customUnitNames.has(unit.upgradesTo), `${unit.name} upgrades to missing custom unit ${unit.upgradesTo}`);
}
const expectedUpgradeChain = [
  'Voidwalker Legion',
  'Riftblade Vanguard',
  'Chrono Praetorian',
  'Nova Guard',
  'Phasebound Exarch',
  'Singularity Titan'
];
for (let index = 0; index < expectedUpgradeChain.length - 1; index += 1) {
  const unit = units.find(candidate => candidate.name === expectedUpgradeChain[index]);
  assert(unit?.upgradesTo === expectedUpgradeChain[index + 1], `Broken visual upgrade chain at ${expectedUpgradeChain[index]}`);
}

const quantumCore = buildings.find(building => building.name === 'Quantum Core');
assert(quantumCore, 'Missing Quantum Core');
assert(
  quantumCore.uniques?.includes('Automatically built in all cities where it is buildable'),
  'Quantum Core must be automatically installed in conquered cities'
);
assert(
  quantumCore.uniques?.includes('Removes extra unhappiness from annexed cities'),
  'Quantum Core must remove annexation unhappiness'
);

const expectedImages = [
  'Images/NationIcons/Aetherion Ascendancy.png',
  'Images/LeaderIcons/Archon Nyra Voss.png',
  ...units.map(unit => `Images/UnitIcons/${unit.name}.png`),
  ...units.map(unit => `Images/TileSets/AbsoluteUnits/Units/${unit.name}.png`),
  ...buildings.map(building => `Images/BuildingIcons/${building.name}.png`),
  ...improvements.map(improvement => `Images/ImprovementIcons/${improvement.name}.png`),
  ...religions.map(religion => `Images/ReligionIcons/${religion}.png`),
  ...beliefs.map(belief => `Images/ReligionIcons/${belief.name}.png`),
  ...techs.map(tech => `Images/TechIcons/${tech.name}.png`)
];
for (const image of expectedImages) {
  assert(fs.existsSync(path.join(root, image)), `Missing image ${image}`);
}

assert(atlases.includes('game'), 'Atlases.json must load the game atlas');
assert(fs.existsSync(path.join(root, 'game.atlas')), 'Missing game.atlas');
assert(fs.existsSync(path.join(root, 'game.png')), 'Missing game.png');
assert(fs.existsSync(path.join(root, 'preview.png')), 'Missing preview.png');

const atlasText = fs.readFileSync(path.join(root, 'game.atlas'), 'utf8');
for (const image of expectedImages) {
  const atlasKey = image.replace(/^Images\//, '').replace(/\.png$/, '');
  assert(atlasText.includes(`\n${atlasKey}\n`), `Atlas is missing ${atlasKey}`);
}

console.log(
  `Validated ${nations.length} nation, ${units.length} units, ${buildings.length} buildings, ` +
  `${improvements.length} improvements, ${beliefs.length} beliefs and ${techs.length} technology.`
);
