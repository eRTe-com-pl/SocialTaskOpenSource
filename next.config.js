// next.config.js
const nextConfig = {
    reactStrictMode: true,
    webpack(config, { isServer }) {
        config.module.rules.push(
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }
        );
        return config;
    },
};

export default nextConfig;