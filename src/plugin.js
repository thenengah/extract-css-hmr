import fs from 'fs'
import getHashDigest from 'loader-utils/lib/getHashDigest'

module.exports = function ({filename}) {
  this.apply = compiler => {
    compiler.plugin('emit', (compilation, next) => {
      const hmrCssEntries = compilation.hmrCssEntries || {}
      Object.keys(hmrCssEntries).forEach(entry => {
        const content = Object.keys(hmrCssEntries[entry]).sort((a, b) =>
          a.position - b.position
        ).map(resourcePath =>
          hmrCssEntries[entry][resourcePath].style
        ).join('')
        const hash = getHashDigest(content, 'md5', 'base64', 10)
        filename = filename.replace(/\[name\]/, entry).replace(/\[hash\]/, hash)
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
      // also unlink old files
      Object.keys(compilation.assets).forEach(key => {
        fs.writeFileSync(`${compiler.outputPath}/${key}`, compilation.assets[key].source())
      })
      next()
    })
  }
}
