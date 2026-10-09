export function frontendSitePath(path, scope, root) {
  if (typeof path !== "string") return null;
  let value = path;
  for (const module of ["shop", "blog"]) {
    value = value
      .replace(`/api/site/${module}/${scope}/pages/`, `${root}/pages/`)
      .replace(
        `/api/${module}/${scope}/site/`,
        `${root}/${module}/${module === "blog" ? "posts" : "products"}/`,
      );
    if (value === `/api/${module}/${scope}/site`) value = `${root}/${module}`;
  }
  value = value
    .replace(`/api/site/site/${scope}/pages/`, `${root}/pages/`)
    .replace(`${root}/blog/posts/categories/`, `${root}/blog/categories/`)
    .replace(`${root}/blog/posts/tags/`, `${root}/blog/tags/`);
  if (value.startsWith(`/business/${scope}/`))
    return root ? value : value.slice(`/business/${scope}`.length);
  if (/^\/(shop|blog)(\/|$)/.test(value) || value.startsWith("/pages/"))
    return `${root}${value}`;
  return value === root || value === "/" ? (root ? `${root}/shop` : "/") : null;
}
