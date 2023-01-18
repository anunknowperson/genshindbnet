const path = require("path");

module.exports = {
    i18n: {
        locales: ['chs', 'cht', 'en', 'fr', 'de', 'es', 'pt', 'ru', 'jp', 'kr', 'th', 'vi', 'id', 'tr', 'it'],
        defaultLocale: 'en',
      },
      localePath: path.resolve("./public/locales"),
  };