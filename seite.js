/*
 * Landing-Page — das bisschen Verhalten, das die Seite braucht.
 *
 * Vier Sachen, mehr nicht: die Farbreihe füllen, beim Scrollen auftauchen lassen,
 * die Kopfzeile absetzen, sobald man gescrollt hat, und der Konfetti-Moment.
 * Alles ohne Bibliothek — die Seite soll auf einem alten Handy in einem
 * Schul-WLAN schnell sein, und jede Abhängigkeit ist ein Grund, warum sie es
 * eines Tages nicht mehr ist.
 */

(() => {
  'use strict';

  const wenigerBewegung = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Die Farbreihe ────────────────────────────────────────────────────
     Dieselben sechs Kategorien wie in der App (src/config/categories.ts).
     Bis 01.09.2026 lief die Reihe als Endlosband nach links und stand deshalb
     zweimal im DOM — die Animation schob um -50 %, also genau um eine der beiden
     Listen. Ian mochte die Bewegung nicht; seit sie weg ist, reicht eine Liste.
     `querySelectorAll` bleibt trotzdem stehen: Es tut bei einer Liste dasselbe
     und macht aus einer zweiten kein kaputtes Skript. */

  /* Seit Phase 14 gezeichnete Icons statt Emojis — die Namen kommen aus
     `icons.js` und heissen dort genauso wie in `src/config/categories.ts`
     der App. Wer eine Kategorie umbenennt, muss BEIDE Stellen anfassen. */
  const KATEGORIEN = [
    { id: 'sport',    icon: 'laufen', label: 'Sport',   beispiel: 'Tennis, Laufen, Bouldern' },
    { id: 'food',     icon: 'tasse',  label: 'Essen',   beispiel: 'Kaffee, Mittagessen, Kochen' },
    { id: 'study',    icon: 'buch',   label: 'Lernen',  beispiel: 'Schularbeit, Projektpartner' },
    { id: 'culture',  icon: 'ticket', label: 'Kultur',  beispiel: 'Kino, Konzert, Fortgehen' },
    { id: 'outdoor',  icon: 'baum',   label: 'Draußen', beispiel: 'Donauinsel, Picknick' },
    { id: 'creative', icon: 'pinsel', label: 'Kreativ', beispiel: 'Fotografieren, Zeichnen' },
  ];

  document.querySelectorAll('.band-liste').forEach((liste) => {
    KATEGORIEN.forEach((k) => {
      const li = document.createElement('li');
      li.dataset.kat = k.id;
      li.innerHTML =
        `${icon(k.icon)} ${k.label}` +
        `<span class="beispiel">${k.beispiel}</span>`;
      liste.appendChild(li);
    });
  });

  /* ── 2. Auftauchen beim Scrollen ─────────────────────────────────────────
     `IntersectionObserver` statt eines Scroll-Handlers: Der Browser rechnet das
     selbst und nicht bei jedem einzelnen Scroll-Ereignis. Jedes Element wird
     nach seinem Auftritt abgemeldet — was einmal da ist, soll beim Zurückscrollen
     nicht wieder verschwinden. */

  const ziele = [...document.querySelectorAll('.reveal')];

  function zeigen(el, beobachter) {
    el.classList.add('sichtbar');
    if (beobachter) beobachter.unobserve(el);
  }

  if (wenigerBewegung || !('IntersectionObserver' in window)) {
    ziele.forEach((el) => el.classList.add('sichtbar'));
  } else {
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((e) => { if (e.isIntersecting) zeigen(e.target, beobachter); });

        // Nachziehen — der Grund steht hier, weil er nicht offensichtlich ist:
        // Ein Beobachter meldet nur, was er zwischen zwei Bildern SIEHT. Wischt
        // jemand am Handy hart nach unten, springt die Seite in einem Bild um
        // tausend Pixel, und alles, was dabei komplett durchs Fenster gerauscht
        // ist, wurde nie „sichtbar" — und bleibt für immer unsichtbar. Beim Testen
        // ist genau das passiert, ausgerechnet dem letzten Knopf der Seite.
        // Deshalb wird bei jeder Meldung nachgeschaut, was inzwischen oberhalb der
        // Fensterunterkante steht. Zwanzig Elemente, das kostet nichts.
        ziele.forEach((el) => {
          if (el.classList.contains('sichtbar')) return;
          if (el.getBoundingClientRect().top < window.innerHeight) zeigen(el, beobachter);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    ziele.forEach((el) => beobachter.observe(el));
  }

  /* ── 3. Kopfzeile absetzen ───────────────────────────────────────────────
     Die Linie unter der Kopfzeile kommt erst, wenn wirklich etwas darunter
     durchläuft. Ganz oben wäre sie ein Strich ohne Anlass. */

  const kopf = document.getElementById('kopf');
  const wache = document.createElement('div');
  wache.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
  document.body.prepend(wache);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([e]) => kopf.classList.toggle('geklebt', !e.isIntersecting),
      { threshold: 1 },
    ).observe(wache);
  }

  /* ── 4. Der Konfetti-Moment ──────────────────────────────────────────────
     In der App ist das der emotionale Höhepunkt: Der Verfasser bestätigt, und es
     regnet Konfetti in den Aktivitätsfarben. Auf der Seite kann man ihn einmal
     auslösen — das erklärt in einer Sekunde, was drei Absätze Text nicht schaffen.

     Die Schnipsel starten dort, wo der Knopf steht, nicht am oberen Rand: Das
     Konfetti kommt aus der Handlung, nicht vom Himmel. */

  const FARBEN = ['#EDA803', '#2E7D5B', '#3D6BC2', '#7B4FC2', '#6B8C28', '#C23D7B'];

  const knopf = document.getElementById('dabei');
  const verabredet = document.getElementById('verabredet');
  const buehne = document.getElementById('konfetti');

  function konfetti(x, y) {
    if (wenigerBewegung) return;
    const bruchstuecke = document.createDocumentFragment();

    for (let i = 0; i < 30; i += 1) {
      const s = document.createElement('span');
      s.className = 'schnipsel';
      const winkel = (Math.PI * (0.15 + Math.random() * 0.7)) * -1; // nach oben streuen
      const kraft = 130 + Math.random() * 190;
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.background = FARBEN[i % FARBEN.length];
      s.style.setProperty('--dx', `${Math.cos(winkel) * kraft * (Math.random() < 0.5 ? -1 : 1)}px`);
      s.style.setProperty('--dy', `${Math.sin(winkel) * kraft + 420}px`);
      s.style.setProperty('--dreh', `${Math.round(Math.random() * 720 - 360)}deg`);
      s.style.setProperty('--dauer', `${1.1 + Math.random() * 0.8}s`);
      bruchstuecke.appendChild(s);
    }

    buehne.appendChild(bruchstuecke);
    // Aufräumen, sonst sammeln sich unsichtbare Elemente an, die nichts mehr tun.
    window.setTimeout(() => { buehne.textContent = ''; }, 2200);
  }

  if (knopf && verabredet && buehne) {
    knopf.addEventListener('click', () => {
      const k = knopf.getBoundingClientRect();
      konfetti(k.left + k.width / 2, k.top + k.height / 2);
      knopf.hidden = true;
      verabredet.hidden = false;

      // Nach ein paar Sekunden zurücksetzen: Wer die Seite jemandem zeigt, will
      // es noch einmal vorführen können, ohne neu zu laden.
      window.setTimeout(() => {
        verabredet.hidden = true;
        knopf.hidden = false;
      }, 4200);
    });
  }
})();
