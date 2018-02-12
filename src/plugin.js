import fs from 'fs'
import getHashDigest from 'loader-utils/lib/getHashDigest'

module.exports = function ({identify}) {
  this.apply = compiler => {
    compiler.plugin('emit', (compilation, next) => {
      const hmrCssEntries = compilation.hmrCssEntries || {}
      Object.keys(hmrCssEntries).forEach(entry => {
        const content = Object.keys(hmrCssEntries[entry]).map(file => {
          const {position, style} = hmrCssEntries[entry][file]
          return {file, position, style}
        }).sort((a, b) =>
          b.position - a.position
        ).map(obj =>
          obj.style
        ).join(' ')
        const hash = getHashDigest(content, 'md5', 'base64', 10)
        const filename = identify.replace(/\[name\]/, entry).replace(/\[hash\]/, hash)
        compilation.assets[filename] = {
          source: () => content,
          size: () => content.length
        }
        compilation.chunks.filter(({name}) => 
          name === entry
        )[0].files.push(filename)
      })
      next()
    })
    compiler.plugin('after-emit', (compilation, next) => {
      Object.keys(compilation.assets).forEach(key => {
        fs.writeFileSync(`${compiler.outputPath}/${key}`, compilation.assets[key].source())
      })
      next()
    })
  }
}
