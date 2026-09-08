/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://codefuse.online/",
  generateRobotsTxt: true,
  outDir: ".next",

  // Exclude specific static routes
  exclude: ["/register-team", "/admin", "/confirm", "/game"],

  // Configure robots.txt to prevent crawling of sensitive paths
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin", "/register-team", "/confirm", "/game", "/analytics"],
        allow: ["/", "/register"],
      },
    ],
  },
};
