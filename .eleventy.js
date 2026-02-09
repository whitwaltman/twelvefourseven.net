import yaml from "js-yaml";
import filters from "./_utils/filters.js";
import transformExternalLinks from "./_utils/links.js";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (config) {
	// Add global data variable to signal build modality
	const isProduction = process.env.NODE_ENV === "production";
	config.addGlobalData("isProduction", isProduction);

	// Copy public assets
	config.addPassthroughCopy({
		"./public": "/",
	});

	// Add global default layout
	config.addGlobalData("layout", "base.njk");

	// Register filter functions
	Object.keys(filters).forEach((filter) => {
		config.addFilter(filter, filters[filter]);
	});

	// Register imported links function as a transform
	config.addTransform("externalLinks", transformExternalLinks);

	// Add image transformer plugin with specified configuration
	config.addPlugin(eleventyImageTransformPlugin, {
		urlPath: "/img/",
		outputDir: "_site/img/",
		failOnError: true,
		formats: ["webp"],
		widths: [720],
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async"
			},
		},
	});

	// Set up YAML parsing
	config.addDataExtension("yaml", (contents) => {
		return yaml.load(contents);
	});

	// Specify server port
	config.setServerOptions({ port: 1002 });

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site",
		}
	};
}