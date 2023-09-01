# P1E World

![P1E World Banner](https://p1e-wrld.vercel.app/conceptBanner.png)

P1E World is a comprehensive gaming platform, bringing together various exciting mini-games for a seamless, immersive experience.

**Licenses:** [PiOS](https://github.com/pi-apps/PiOS/blob/main/LICENSE)


**Play now on the testnet!**

## Table of Contents
1. [Contribution Rules](#contribution-rules)
2. [Tech Stack](#tech-stack)
2. [How to Contribute](#how-to-contribute)
    - [Add an Asset](#add-an-asset)
    - [Add a Minigame](#add-a-minigame)
    - [Fix a Bug](#fix-a-bug)
    - [Add a Mechanic](#add-a-mechanic)
3. [Credits](#credits)

## Contribution Rules
We welcome and encourage community contributions to P1E World. Before getting started, make sure to read and adhere to the following rules:

1. Please ensure that your code adheres to our coding standards and conventions.
2. Every contribution must have an associated issue.
3. Do not mix multiple concerns/changes in a single contribution. Keep it focused for easy review.
4. Always base your changes on the latest version of the main branch.

## Tech Stack
- Javascript
- React (Vite version)
- @React-Three/Fiber
- Firebase
- Pi SDK

## How to Contribute

### Add an Asset
To add a new asset (building or avatar):

1. Download your asset as a GLB file
2. Fork the repository.
3. Add your GLB asset to the public folder
4. If your asset is an avatar, go to player.jsx in the game-components folder, and replace the src of ```<Gltf src={'/path_to_your_avatar.glb'} scale={1} castShadow />``` and test the scale to find one that works best. Playing with the scale will yield different physics.
5. If your asset is a building, create a new building.jsx file in the buildings folder of the world-assets folder in the p1e-world folder. Play with the scale and position props to find your prefered scale and position on the map.
6. Test your asset in the marketplace, and find the ideal scale. 
7. Create a Pull Request with a description and reference to the editions you made. The asset will be created in the database upon approval, and all purchases of the asset will be redirected to the creator of the asset.

### Add a Minigame
To add a new minigame:

1. Fork the repository.
2. Develop the minigame following our coding standards.
3. Test your minigame extensively.
4. Create a Pull Request with a description and reference to the related issue.

### Fix a Bug
To fix a bug:

1. Fork the repository.
2. Create a new branch for the bug fix.
3. Fix the bug and test your changes extensively.
4. Create a Pull Request with a description of the bug and your solution.

### Add a Mechanic
To add a new mechanic:

1. Fork the repository.
2. Develop the mechanic following our coding standards.
3. Test the mechanic extensively.
4. Create a Pull Request with a description and reference to the related issue.

## Credits
P1E World is a community-driven project. We would like to thank all of our contributors and supporters. All of the 3D models and art that are used in this project are open source, and credits are given to the artists in the assets' respective files. Please submit an issue or PR if you are not given credit for your work.
