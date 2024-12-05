const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mainCssFile = 'styles.css';

const tailwind = {
    darkMode: 'media',
    plugins: [
        // require('@tailwindcss/forms') // optional
    ],
    variants: {},
    theme: {
        extend: {},
    },
    content: {
        files: [
            '*.{js,html,css}',
            './kotlin/**/*.{js,html,css}'
        ],
        transform: {
            js: (content) => {
                return content.replaceAll(/(\\r)|(\\n)|(\\r\\n)/g,' ')
            }
        }
    },
};


// webpack tailwind css settings
((config) => {
    config.entry.main.push('/kotlin/' + mainCssFile);
    config.module.rules.push({
        test: /.css$/,
        use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: 'css-loader'},
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            require('tailwindcss')({config: tailwind}),
                            require('autoprefixer'),
                            require('cssnano')
                        ]
                    }
                }
            }
        ]
    });
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: mainCssFile
        })
    );
})(config);