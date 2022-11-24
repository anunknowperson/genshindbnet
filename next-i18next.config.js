const path = require("path");

module.exports = {
    i18n: {
        locales: ['chs', 'cht', 'en', 'fr', 'de', 'es', 'pt', 'ru', 'jp', 'kr', 'th', 'vi', 'id'],
        defaultLocale: 'en',
      },
      localePath: path.resolve("./public/locales"),
  };