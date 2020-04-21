module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],

    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-dupe-keys': 0,
        'import/no-duplicates': 0,
        'eol-last': 0,
        'quote-props':0,
        'no-trailing-spaces':0,
        'indent': 0,
        'vue/no-unused-vars':0,
        'no-unused-vars': 0,
        'no-useless-return':0
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ]
}