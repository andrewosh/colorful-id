# colorful-id
Generates a human-readable identifier

This module uses the [wordpos](https://github.com/moos/wordpos) module to generate an ID that
consists of a noun and an optional number of adjectives.

**CAUTION**: [wordpos](https://github.com/moos/wordpos) pulls in a 30MB WordNet database and is *not* browserifiable.

### Installation
```
npm i colorful-id
```

### Usage
```
const makeId = require('colorful-id')
makeId(console.log)
// 'bodyless-dactylic-juggler'

makeId({numAdjectives: 4}, console.log)
// 'budding-pedantic-jovian-boxlike-tsuris'
```

### API

##### `makeId({ numAdjectives: 2}, cb)`
Generates an identifier with the specified number of adjectives

### License
MIT
