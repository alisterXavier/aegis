/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'node-loader',
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
