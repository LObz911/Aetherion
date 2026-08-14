# Aetherion Ascendancy

A deliberately overpowered science-fiction civilization for Unciv.

## Included content

- Civilization: **Aetherion Ascendancy**
- Leader: **Archon Nyra Voss**
- Civilization trait: **Sovereigns of the Continuum**
- Units: **Voidwalker Legion**, **Singularity Titan**, and **Reality Breaker**
- Buildings: **Quantum Core**, **Stellar Forge**, and **Omega Nexus**
- Technology: **Ascendant Physics**
- Original icons, leader portrait, packed texture atlas, and repository preview

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

## Balance profile

The civilization starts with large flat yields in every city. Military units are produced twice as fast, cost far less to maintain, heal rapidly, move after attacking and ignore zones of control. Its unique replacements greatly exceed the statistics of their normal counterparts.

## Compatibility

Built against the current official Unciv mod schemas and the Gods & Kings object names. Do not enable it as a base ruleset.

## Customising the mod

The main values are in:

- `jsons/Nations.json` for the leader, colours, cities and civilization-wide powers
- `jsons/Units.json` for unit strength, movement and costs
- `jsons/Buildings.json` for yields and percentage bonuses
- `jsons/Techs.json` for the late-game technology

All gameplay names are case-sensitive.

Run `node tools/validate-mod.cjs` after editing gameplay files. Run `node tools/render-assets.cjs` with the `sharp` package installed after changing the SVG artwork.

## Credits and licence

The faction, text and vector artwork are original. See `CREDITS.md` and `LICENSE`.
