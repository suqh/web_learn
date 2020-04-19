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
        'eol-last': 0
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ]
}