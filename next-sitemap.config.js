/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wip.genshindb.net',
  generateRobotsTxt: true, // (optional)
  exclude: ['/internal/*', '/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.SITE_URL + '/server-sitemap.xml', // <==== Add here
    ],
  },
}