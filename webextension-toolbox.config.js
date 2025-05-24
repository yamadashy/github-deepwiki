module.exports = {
  webpack: (config, { dev, vendor }) => {
    // Add TypeScript support
    config.resolve.extensions.push('.ts');
    
    // Add rule for TypeScript files
    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              "types": ["chrome"]
            }
          }
        }
      ],
      exclude: /node_modules/
    });
    
    // Return the modified config
    return config;
  }
};
