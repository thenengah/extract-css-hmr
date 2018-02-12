# extract-css-hmr
This is a node module which exposes a webpack loader and plugin to extract css from hot module reloads.

## Problem
You are trying to hot reload css server side and you use ExtractTextWebpackPLugin.

## Solution
Use ExtractTextWebpackPLugin for production and ExtractCssHMR (this module) for development.

## Install

```bash
  npm install extract-css-hmr --save-dev
```

## Config
Add the loader and plugin to you webpack config.

```es6
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'extract-css-hmr/loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new ExtractCssHmrPlugin({
      filename: '[name]-[hash].css'
    })
  ]
``
