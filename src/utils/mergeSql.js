/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const glob = require('glob')
const files = glob.sync('./sql/**/*.sql')

fs.unlinkSync('./merged.sql')
files.forEach(file => {
  const data = fs.readFileSync(file)
  fs.appendFileSync('./merged.sql', data)
})
