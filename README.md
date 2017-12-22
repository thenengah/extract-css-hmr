# extract-css-hmr
Extract CSS from hot module reloading

## Install

```bash
  npm install extract-css-hmr --save-dev
```

## Loader
Add the loader to you webpack module rules.

```es6
  {
    module: {
      rules: [{
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['extract-css-hmr/loader']
      }]
    }
  }
```

## Plugin
Add the plugin to your webpack plugins config.

```es6
  import ExtractCssHmrPlugin from 'extract-css-hmr/plugin'
  
  { 
    plugins: [
      new ExtractCssHmrPlugin({
        filename: '[name]-[hash].css'
      })
    ]
  }
```
