# Dunder Mifflin: odprawa przed rozmową z HR

Statyczna strona motywacyjna, która ma pozytywnie nastawić przed pierwszym etapem rekrutacji (screening z osobą z HR). Czysty HTML, CSS i odrobina JavaScriptu, bez budowania i bez zależności.

## Struktura

- `index.html` — cała treść strony (teksty po polsku, sekcje: dobre wiadomości, odprawa w 3 krokach, checklista, stres, cytat, ekipa kibiców, plan dnia, zakończenie),
- `styles.css` — wygląd (kolory i fonty w zmiennych na początku pliku),
- `app.js` — data w górnym pasku oraz interaktywna checklista (stan zapisuje się w przeglądarce),
- `assets/screening/` — zdjęcia użyte na stronie (zoptymalizowane JPEG-i).

## Zmiana tekstów i kolorów

Teksty edytujesz bezpośrednio w `index.html`. Paletę zmieniasz w bloku `:root` na początku `styles.css` (`--ink`, `--paper`, `--blue`, `--yellow` i pozostałe).

## Automatyczny deployment na GitHub Pages

Workflow znajduje się w `.github/workflows/deploy-pages.yml`. Po wypchnięciu zmian do gałęzi `main` GitHub Actions automatycznie publikuje zawartość repozytorium na GitHub Pages. Można też uruchomić deployment ręcznie z zakładki **Actions**.

W ustawieniach repozytorium ustaw `Settings → Pages → Source` na **GitHub Actions**.

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.
