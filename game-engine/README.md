# Game engine-ek – lapozható HTML-előadás

A prezentáció internetkapcsolat nélkül is működő, statikus HTML-változata. A diák képként szerepelnek, ezért a megjelenésük böngészőtől és telepített betűtípusoktól függetlenül az eredeti előadást követi.

## Használat

Nyisd meg az `index.html` fájlt egy böngészőben. Lapozás:

- bal/jobb nyíl, Page Up/Page Down vagy szóköz;
- a képernyő szélei és az alsó nyílgombok;
- mobilon vízszintes húzás;
- `O`: diaáttekintő;
- `F`: teljes képernyő;
- `L`: az aktuális diához tartozó hivatkozások.

## Feltöltés GitHub Pagesre

1. Hozz létre egy új GitHub-repositoryt.
2. Töltsd fel a ZIP tartalmát a repository gyökerébe úgy, hogy az `index.html` közvetlenül ott legyen.
3. A repository `Settings → Pages` oldalán válaszd a `Deploy from a branch` lehetőséget.
4. Állítsd be a `main` ágat és a `/ (root)` mappát, majd mentsd el.

A publikált cím néhány percen belül megjelenik ugyanitt.

## Fájlok

- `index.html` – a lejátszó felülete;
- `style.css` – reszponzív megjelenés;
- `app.js` – lapozás, teljes képernyő, áttekintő és hivatkozások;
- `slides/` – a 12 dia képe;
- `.nojekyll` – a GitHub Pages közvetlen statikus kiszolgálásához.
