# Aetherion Ascendancy

A deliberately overpowered science-fiction civilization for Unciv, built for unrestricted conquest and sandbox power fantasies.

## Included content

- Civilization: **Aetherion Ascendancy**
- Leader: **Archon Nyra Voss**
- Civilization trait: **Sovereigns of the Continuum**
- Combat-unit progression: **Voidwalker Legion**, **Riftblade Vanguard**, **Chrono Praetorian**, **Nova Guard**, **Phasebound Exarch**, and **Singularity Titan**
- Siege unit: **Reality Breaker**
- Builders: **Quantum Fabricator** and **Worldshaper Architect**
- Buildings: **Quantum Core**, **Stellar Forge**, **Omega Nexus**, **Genesis Crucible**, **Infinite Treasury**, **Continuum Basilica**, **Eternal Archive**, **Worldheart Engine**, and **Omniversal Exchange**
- Religion: **Continuum Ascendance**, with five original beliefs
- Improvements: **Genesis Garden**, **Continuum Spire**, **Excavation Site**, **Stellar Fishery**, **Abyssal Extractor**, **Quantum Reef**, **Orbital Dockyard**, and **Riftway Nexus**
- Technology: **Ascendant Physics**
- Distinct high-quality map sprites for every unit, original icons, leader portrait, packed texture atlas, and repository preview
- Release notes: `CHANGELOG.md`

This is an extension mod for the **Civ V - Gods & Kings** base ruleset. It is intentionally unbalanced and intended for power-fantasy or sandbox games.

## Install from this ZIP

1. Extract the archive.
2. Move the `Aetherion-Ascendancy` folder into Unciv's `mods` folder.
3. Open Unciv and start a new game.
4. Select **Civ V - Gods & Kings** as the base ruleset.
5. Enable **Aetherion Ascendancy** under extension mods.
6. Choose the Aetherion Ascendancy as your nation.

## Install after publishing to GitHub

1. Put the contents of this folder at the root of a public GitHub repository.
2. In Unciv, open **Mods** and choose **Download mod from URL**.
3. Paste the repository URL.
4. Add the GitHub topics `unciv-mod` and `unciv-mod-expansions` when you are ready to list it publicly.

## Absolute-power profile

- **Purchase almost anything:** All units and ordinary buildings cost only 10 Gold to purchase. Buildings can also be purchased with Faith, allowing access to purchases such as wonders that normally reject Gold.
- **One-turn construction:** A 999,900% production bonus applies to all buildings and wonders, making normal construction finish in one turn even in a new city.
- **Omniversal builders:** The Quantum Fabricator and Worldshaper Architect can travel directly across water and build every available improvement category. That includes base-game Fishing Boats, Offshore Platforms, Oil wells, roads, railroads and Great Improvements as well as all eight Aetherion improvements.
- **One-turn improvements:** Both builders receive extreme improvement speed, the nation reduces improvement time by 99%, and all eight exclusive improvements have a base build time of zero. Both builders can instantly construct Great Improvements; the Worldshaper also retains its dedicated instant Genesis Garden and Continuum Spire actions. Unciv resolves construction in turns rather than real-time seconds, so one turn is the fastest supported result.
- **Massive military damage:** Every military unit receives +10,000% Strength. Aetherion's unique units stack their already extreme base statistics with this bonus.
- **Courthouse-free conquest:** A Quantum Core is automatically installed in every Aetherion city and removes extra unhappiness from annexation. Civilization-wide unhappiness from cities and population is also eliminated.
- **9,999-fold tradable resources:** Every improved luxury or strategic resource is multiplied by 9,999. A one-copy luxury deposit therefore supplies 9,999 tradable copies; larger strategic deposits provide corresponding multiples.
- **Map-spanning movement:** Every military unit receives +50 Movement and +10 Sight, allowing it to cross very large distances in one turn.
- **Exact 99,999 economy:** Every city receives 99,999 Food, Gold, Culture and Faith per turn before its buildings and tile yields are counted. The late-game Omniversal Exchange adds another 99,999 of every major yield.
- **Ascendant religion:** Continuum Ascendance includes original Pantheon, Founder, Follower and Enhancer beliefs for enormous yields, near-free Faith armies and map-wide natural spread.
- **Visual evolution:** Each stage from Voidwalker Legion to Singularity Titan has different armor, weapons and silhouette. The Reality Breaker and both builders also use their own sprites.

## Builder capabilities and improvement rules

Both Aetherion builders have permission to work on land and water, but that permission does not bypass an improvement's own requirements. An action appears only when its technology has been researched and the tile satisfies the base game's terrain and resource rules. For example, Fishing Boats require an appropriate water resource, Offshore Platforms require offshore Oil, Oil wells require valid land Oil, and roads or railroads follow their normal land-route rules. Water travel lets the builders reach valid sea tiles without embarking; it does not make a land improvement valid at sea. Great Improvements become available through their normal game systems, while the two builders' instant-construction ability removes their build time.

The Aetherion custom catalog is:

- **Genesis Garden** — land; Agriculture; 99,999 of every major yield.
- **Continuum Spire** — land; Writing; 99,999 of every major yield.
- **Excavation Site** — land; Archaeology; 99,999 Gold, Culture and Science.
- **Stellar Fishery** — water; Sailing; 99,999 Food, Gold and Science.
- **Abyssal Extractor** — water; Refrigeration; 99,999 Production, Gold and Science.
- **Quantum Reef** — water; Ecology; 99,999 Food, Culture, Faith and Science.
- **Orbital Dockyard** — water; Navigation; 99,999 Production, Gold, Culture and Science.
- **Riftway Nexus** — land or water; Ascendant Physics; 99,999 of every major yield and a 999% defensive bonus.

These custom improvements do not require a resource deposit. Automated builders will not replace them, and pillaging one yields approximately 99,999 Gold.

## Showing the custom unit artwork

The sprites are installed for Unciv's default **AbsoluteUnits** unit set. In Unciv's display settings, enable **Show pixel units** and use **AbsoluteUnits** to see the changing physical appearance on the map.

## Compatibility

Built against the current official Unciv mod schemas and the Gods & Kings object names. Do not enable it as a base ruleset.

## Customising the mod

The main values are in:

- `jsons/Nations.json` for the leader, colours, cities and civilization-wide powers
- `jsons/Units.json` for unit strength, movement and costs
- `jsons/Buildings.json` for yields and percentage bonuses
- `jsons/Beliefs.json` and `jsons/Religions.json` for Continuum Ascendance
- `jsons/TileImprovements.json` for one-turn exclusive improvements
- `jsons/Techs.json` for the late-game technology

All gameplay names are case-sensitive.

Run `node tools/validate-mod.cjs` after editing gameplay files. Run `node tools/slice-unit-sprites.cjs` after replacing the 3x3 source sheet, then run `node tools/render-assets.cjs` with the `sharp` package installed to rebuild icons and the atlas.

## Credits and licence

The faction, text and artwork were created specifically for this mod. See `CREDITS.md` and `LICENSE`.
