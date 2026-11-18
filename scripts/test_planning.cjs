const fs = require('fs');
const path = require('path');
const { brands } = require('../src/data/brands.ts');
const { navigationData } = require('../src/data/navigation.ts');

// We will generate the 13 planning files + PROGRESS.md
console.log('Generating SEO planning and mapping files...');
