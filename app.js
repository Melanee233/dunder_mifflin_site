const fallbackTheme = {
  ink: "#2f2b2a",
  paper: "#f7f2e8",
  yellow: "#f6dc8c",
  blue: "#d3e8e6",
  pink: "#f0cfc2",
  orange: "#e5694f",
  mode: "soft-confidence",
  gallery: {
    primaryImage: "assets/the-office/michael-boss-mug.png",
    primaryAlt: "Michael Scott przy biurku z kubkiem World's Best Boss",
    primaryCaption: "A very official confidence boost",
    secondaryImage: "assets/the-office/michael-grimace.png",
    secondaryAlt: "Michael Scott robiący zabawną minę",
    secondaryCaption: "You can survive one conversation"
  }
};

const byId = (id) => document.getElementById(id);
const themeProperties = { ink: "--ink", paper: "--paper", yellow: "--yellow", blue: "--blue", pink: "--pink", orange: "--orange" };

function applyTheme(theme = {}) {
  const root = document.documentElement;
  for (const [key, property] of Object.entries(themeProperties)) {
    if (typeof theme[key] === "string" && theme[key].trim()) root.style.setProperty(property, theme[key].trim());
  }
  document.body.dataset.theme = theme.mode || "office-chaos";
  if (theme.gallery) {
    const primary = byId("gallery-image-primary");
    const secondary = byId("gallery-image-secondary");
    if (theme.gallery.primaryImage) primary.src = theme.gallery.primaryImage;
    if (theme.gallery.primaryAlt) primary.alt = theme.gallery.primaryAlt;
    if (theme.gallery.secondaryImage) secondary.src = theme.gallery.secondaryImage;
    if (theme.gallery.secondaryAlt) secondary.alt = theme.gallery.secondaryAlt;
    if (theme.gallery.primaryCaption) byId("gallery-caption-primary").textContent = theme.gallery.primaryCaption;
    if (theme.gallery.secondaryCaption) byId("gallery-caption-secondary").textContent = theme.gallery.secondaryCaption;
  }
}

function resolveTheme(config) {
  return config.themes?.[config.activeTheme] || {};
}

byId("today").textContent = new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
byId("year").textContent = new Date().getFullYear();
applyTheme(fallbackTheme);
fetch("content/theme.json", { cache: "no-store" }).then((response) => response.ok ? response.json() : Promise.reject()).then((config) => applyTheme(resolveTheme(config))).catch(() => {});
