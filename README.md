# twelvefourseven.net

## build and deploy
1. `npm run build:clean`
2. `npm run format`
3. `./utils/deploy.sh` (optional `--delete` flag available)

## countdown notes

- to add `when`, open a js playground and create a new date object with the **local time** that the countdown should end at
    - e.g. `const d = new Date('2025-10-09T09:21:00');` (time i was born)
    - `console.log(d.toISOString());` to get UTC time (use as `when`)
- ignore `fmtd` (just for me so that i have a local reference)