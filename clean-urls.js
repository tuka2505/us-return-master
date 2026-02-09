const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sitemapPath = path.join(root, "sitemap.xml");

const walk = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
};

const stripHtmlInHref = (content) =>
  content.replace(
    /href=(['"])([^'"]+?)\.html(\?[^'"]*)?(\1)/g,
    (_m, q, base, query) => `href=${q}${base}${query || ""}${q}`
  );

const stripHtmlInCanonical = (content) =>
  content.replace(
    /(<link[^>]*rel=['"]canonical['"][^>]*href=['"])([^'"]+?)\.html(\?[^'"]*)?(['"][^>]*>)/gi,
    (_m, head, base, query, tail) => `${head}${base}${query || ""}${tail}`
  );

const updateSitemap = () => {
  if (!fs.existsSync(sitemapPath)) return;
  let xml = fs.readFileSync(sitemapPath, "utf8");
  xml = xml.replace(/<loc>([^<]+)<\/loc>/g, (_m, url) => {
    let u = url.replace(/\.html(?=$|[?#])/g, "");
    u = u.replace(/\/index(?=$|[?#])/g, "/");
    return `<loc>${u}</loc>`;
  });
  fs.writeFileSync(sitemapPath, xml, "utf8");
};

const updateHtmlFiles = () => {
  const files = walk(root).filter((f) => f.endsWith(".html"));
  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    const updated = stripHtmlInCanonical(stripHtmlInHref(content));
    if (updated !== content) fs.writeFileSync(file, updated, "utf8");
  }
};

updateSitemap();
updateHtmlFiles();

console.log("Clean URLs update completed.");
