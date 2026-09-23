const fallbackOffer = {
  updatedAt: "2026-09-23",
  company: "Firma, która lubi porządek w danych",
  location: "Warszawa / hybrydowo",
  role: "Data Architect",
  lead: "Szukamy osoby, która pomoże zamienić skomplikowany ekosystem danych w coś, co ma sens także po trzecim spotkaniu statusowym.",
  mission: ["projektowanie architektury danych i kluczowych modeli", "łączenie potrzeb biznesu, analityki i technologii", "wyznaczanie standardów jakości, bezpieczeństwa i skalowania"],
  benefits: ["wpływ na ważne decyzje technologiczne", "zespół, który rozumie słowo „dlaczego”", "przestrzeń na eksperymenty i rozwój"],
  type: "full-time • senior / expert",
  url: "https://career.softserveinc.com/en-us/vacancies/data-architect-aws-89512",
  theme: {
    ink: "#20211f",
    paper: "#f5f0e7",
    yellow: "#f4d35e",
    blue: "#a9d7dc",
    pink: "#edb7ad",
    orange: "#ec6c3f",
    mode: "office-chaos",
    gallery: {
      primaryImage: "assets/copier-chaos.png",
      primaryAlt: "Michael Scott prezentujący swoje nagrody w biurze",
      primaryCaption: "When the data pipeline finally works",
      secondaryImage: "assets/antler-meeting.png",
      secondaryAlt: "Ilustracja sarenki i konia na spotkaniu o architekturze danych",
      secondaryCaption: "Everyone has an opinion about the data model"
    }
  }
};

const byId = (id) => document.getElementById(id);
const formatDate = (date) => new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`));
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

function resolveTheme(offer) {
  return offer.themes?.[offer.activeTheme] || offer.theme || {};
}

function renderOffer(offer) {
  applyTheme(resolveTheme(offer));
  byId("offer-company").textContent = offer.company;
  byId("offer-location").textContent = offer.location;
  byId("offer-role").textContent = offer.role;
  byId("offer-lead").textContent = offer.lead;
  byId("offer-type").textContent = offer.type;
  byId("offer-status").textContent = `Zaktualizowano ${formatDate(offer.updatedAt)}`;
  byId("apply-button").href = offer.url;
  for (const [id, items] of [["offer-mission", offer.mission], ["offer-benefits", offer.benefits]]) {
    byId(id).replaceChildren(...items.map((item) => { const li = document.createElement("li"); li.textContent = item; return li; }));
  }
}

byId("today").textContent = new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
byId("year").textContent = new Date().getFullYear();
renderOffer(fallbackOffer);
fetch("content/offer.json", { cache: "no-store" }).then((response) => response.ok ? response.json() : Promise.reject()).then(renderOffer).catch(() => {});
