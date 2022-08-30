// Convert kebab-case to camelCase: my-page-asset > myPageAsset
export const camelize = s => s.replace(/-(.)/g, l => l[1].toUpperCase());
