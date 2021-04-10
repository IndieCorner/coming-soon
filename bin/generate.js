console.log('Build started')
const start = process.hrtime.bigint();

const fs = require('fs')
const path = require('path')
const mustache = require('mustache')
const allTranslations = require(path.resolve(process.cwd(), './translations.json'))

const createHtmlFile = (translations) => {
  const templatePath = path.resolve(process.cwd(), `./templates/index.html`)
  const template = fs.readFileSync(templatePath, {encoding: 'utf8'})
  const tr =  JSON.stringify(translations).replace(/\\n/ig, '\\n')
  const renderedTemplate = mustache.render(template, {translations: tr})
  fs.writeFileSync(`dist/index.html`, renderedTemplate)
}

createHtmlFile(allTranslations)
const end = process.hrtime.bigint();
console.log(`Building finished in ${end - start} nanoseconds`)
