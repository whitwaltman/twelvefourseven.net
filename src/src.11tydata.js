// https://www.11ty.dev/docs/data-computed/
export default {
    eleventyComputed: {
        // permalink: (data) => `/${data.fileSlug}/`,
        title: (data) => "{{ data.fileSlug | unslug }}"
    }
}