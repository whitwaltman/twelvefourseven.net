import { parseHTML } from "linkedom";

export default function(content) {
	if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
		const { document } = parseHTML(content);
		const links = Array.from(document.querySelectorAll("a"));

		links.forEach((link) => {
			const href = link.getAttribute("href");
			const isExternal = href && href.startsWith("http");

			if (isExternal) {
				link.setAttribute("target", "_blank");
				link.setAttribute("rel", "noopener noreferrer");
				link.classList.add("ext-link");

				const icon = document.createElement("span");
				icon.classList.add("icon-ne");
				icon.innerHTML = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"7\" y1=\"17\" x2=\"17\" y2=\"7\"></line><polyline points=\"7 7 17 7 17 17\"></polyline></svg>";
				link.appendChild(icon);
			}
		});

		return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
	}

	return content;
};