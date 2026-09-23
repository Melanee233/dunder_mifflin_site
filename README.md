# Projekt Antler — mini strona rekrutacyjna

## Jak aktualizować ofertę

Edytuj wyłącznie plik `content/offer.json`. Strona automatycznie wyświetla z niego:

- nazwę firmy i lokalizację,
- nazwę stanowiska,
- opis roli,
- listę obowiązków i benefitów,
- datę ostatniej aktualizacji,
- link do pełnej oferty i przycisk aplikowania.

Po zmianie pliku trzeba ponownie opublikować stronę, jeśli korzystasz z hostingu.

## Automatyczny deployment na GitHub Pages

Workflow znajduje się w `.github/workflows/deploy-pages.yml`. Po wypchnięciu zmian do gałęzi `main` GitHub Actions automatycznie publikuje zawartość repozytorium na GitHub Pages. Można też uruchomić deployment ręcznie z zakładki **Actions**.

W ustawieniach repozytorium ustaw `Settings → Pages → Source` na **GitHub Actions**.

## Zmiana motywu

Aktywną wersję wybierasz przez pole `activeTheme` w pliku `content/offer.json`:

```json
"activeTheme": "worlds-best-boss"
```

Dostępne presety to `office-chaos`, `worlds-best-boss`, `scranton-chaos` i `deer-data`. Pozostałe presety są zapisane w pliku, ale nie są renderowane na stronie, dopóki nie ustawisz ich jako aktywnych.

Kolorystykę i grafiki każdego presetu zmieniasz w sekcji `themes`:

```json
"themes": {
  "worlds-best-boss": {
    "ink": "#20211f",
    "paper": "#f5f0e7",
    "yellow": "#f4d35e",
    "blue": "#a9d7dc",
    "pink": "#edb7ad",
    "orange": "#ec6c3f",
    "mode": "worlds-best-boss"
  }
}
```

Zmiana `activeTheme` i push do `main` zmieni wygląd strony przy kolejnym deploymentcie. Każda wersja może mieć też własne obrazki w polach `gallery.primaryImage` i `gallery.secondaryImage`.

Grafiki w sekcji inspirowanej `The Office` są zapisane lokalnie w `assets/the-office/`, więc nie zależą od zewnętrznych linków. Angielskie quote cards można później łatwo podmienić bez ruszania mechanizmu oferty.

## Podgląd lokalny

Ponieważ przeglądarka blokuje `fetch()` plików JSON otwieranych bezpośrednio, uruchom prosty serwer w katalogu projektu:

```bash
python3 -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.

Strona nie ma jeszcze wysyłki maili — link i automatyzację dodamy w kolejnym kroku, gdy wybierzesz skrzynkę, z której ma to wychodzić.
