import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"
import { componentRegistry } from "./quartz/components/registry"
import type { Analytics } from "./quartz/cfg"

// Show recent-notes only on the index page
registerCondition("only-index", (props) => props.fileData.slug === "index")

// Filter recent-notes to pages tagged "article"
componentRegistry.setOptionOverrides("recent-notes", {
  filter: (page: { frontmatter?: { tags?: string[] } }) =>
    page.frontmatter?.tags?.includes("article") === true,
})

const config = await loadQuartzConfig()

// Analytics configured via environment variables
const provider = process.env.ANALYTICS_PROVIDER
if (provider) {
  config.configuration.analytics = {
    provider,
    websiteId: process.env.ANALYTICS_WEBSITE_ID,
    host: process.env.ANALYTICS_HOST,
  } as Analytics
}

export default config
export const layout = await loadQuartzLayout()
