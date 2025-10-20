# twelvefourseven.net

## build and deploy
1. `npm run build:clean`
2. `npm run format`
3. `./utils/deploy.sh` (optional `--delete` flag available)

## countdown notes
- `/countdown` is populated using the information in `src/_data/countdown.yaml`
- the yaml file is formatted as follows:
    - `when`: the UTC time that the countdown should end at
    - `what`: a brief description of what the countdown is for
    - `fmtd`: a human-readable datetime string with the countdown end time given with my local time zone
- to add a new event, create a new yaml record in the countdown data file
    - it can be helpful to use a [JS playground](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) to test things out

```js
const d = new Date('2025-10-09T09:21:00'); // my birthday
console.log(d.toString()); // fmtd
console.log(d.toISOString()); // when
```