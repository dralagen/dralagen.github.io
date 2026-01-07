import { Analytics, QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Dralagen",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: process.env.ANALYTICS_PROVIDER,
      websiteId: process.env.ANALYTICS_WEBSITE_ID,
      host: process.env.ANALYTICS_HOST,
    } as Analytics,
    locale: "fr-FR",
    baseUrl: "dralagen.fr",
    ignorePatterns: ["private", "templates", ".*"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Open Sans",
        body: "Open Sans",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#f7f5f5",
          lightgray: "#e0e0e0",
          gray: "#aaaaaa",
          darkgray: "#555555",
          dark: "#2b2b2b",
          secondary: "#5c3f35",
          tertiary: "#7d6b5d",
          highlight: "rgba(205, 190, 170, 0.15)",
          textHighlight: "#e8c18b88",
        },
        darkMode: {
          light: "#232120",
          lightgray: "#343331",
          gray: "#6d6a65",
          darkgray: "#c9c0b8",
          dark: "#e6e0d8",
          secondary: "#c19e73",
          tertiary: "#a89985",
          highlight: "rgba(185, 170, 145, 0.05)",
          textHighlight: "#9e8a5f33",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "rose-pine-dawn",
          dark: "nord",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      // Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts(), Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssLimit: 20,
        rssFullHtml: true,
        rssSlug: "rss",
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
