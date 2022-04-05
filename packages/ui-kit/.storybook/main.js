const path = require('path')

module.exports = {
  addons:
    [
      {
        name: '@storybook/addon-docs',
        options: {
          sourceLoaderOptions: {
            injectStoryParameters: false,
          },
        },
      },
      '@storybook/addon-controls',
      '@storybook/addon-storysource',
      '@storybook/addon-toolbars',
      '@storybook/addon-links'
    ],
  stories: ['../src/**/*.stories.@([tj]sx|mdx)'],

  webpackFinal: config => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test && !Array.isArray(rule.test) && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/

    // // use svgr for svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{
                removeViewBox: false
              }]
            }
          }
        },
        { loader: 'url-loader' }
      ]
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../'),
    });

    return config
  }
}
