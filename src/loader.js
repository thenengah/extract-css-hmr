import fs from 'fs'
import path from 'path'

const hmrCssEntries = {}

const findEntry = mod => {
  if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
    return findEntry(mod.reasons[0].module)
  }
  return path.dirname(fs.realpathSync(mod.resource)).split('/').pop()
}

module.exports = function(style) {
  const entry = findEntry(this._module)
  hmrCssEntries[entry] = hmrCssEntries[entry] || {}
  hmrCssEntries[entry][this.resourcePath] = hmrCssEntries[entry][this.resourcePath] || {
    position: Object.keys(hmrCssEntries[entry]).length
  }
  hmrCssEntries[entry][this.resourcePath].style = style
  this._compilation.hmrCssEntries = hmrCssEntries
  return style
}
