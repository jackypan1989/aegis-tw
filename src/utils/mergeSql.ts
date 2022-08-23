/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import glob from 'glob'

const files = glob.sync('./sql/**/*.sql')

fs.unlinkSync('./merged.sql')
files.forEach(file => {
  const data = fs.readFileSync(file)
  fs.appendFileSync('./metrged.sql', data)
})
