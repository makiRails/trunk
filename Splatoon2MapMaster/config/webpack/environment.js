const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')

environment.loaders.prepend('erb', erb)

environment.config.set('output.library', ['Packs', '[name]'])


const webpack = require('webpack')
environment.plugins.prepend('Provide',
    new webpack.ProvidePlugin({
        $: 'jquery/src/jquery',
        jQuery: 'jquery/src/jquery',
        html2canvas: 'html2canvas/dist/html2canvas'
    })
)

module.exports = environment
