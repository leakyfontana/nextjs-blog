// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.icons8.com',
          port: '',
          pathname: '/3d-fluency/**',
        },
      ],
    },
  }