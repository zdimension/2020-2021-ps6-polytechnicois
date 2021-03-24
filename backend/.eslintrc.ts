module.exports = {
    extends: "airbnb-base",
    env: {
        jest: true,
        node: true,
    },
    rules: {
        "max-len": ["error", 200, { "ignoreStrings": true }],
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "semi": ["error", "always"],
        "linebreak-style": "off",
        "indent": ["error", 4],
        "brace-style": ["error", "allman"],
        "quotes": ["error", "double"],
        "arrow-brace-style": "off",
        "no-unused-vars": "warn",
        "comma-dangle": "off"
    }
};
