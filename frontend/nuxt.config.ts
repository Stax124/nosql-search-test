// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["nuxt-meilisearch", "@nuxt/ui"],
	meilisearch: {
		hostUrl: "http://localhost:7700",
		searchApiKey:
			"f9bad4bf7dd78862681902e0e9b448b3a81bc4672d73f396037d0082c4f33b30",
		instantSearch: {
			theme: "algolia",
		},
	},
});
