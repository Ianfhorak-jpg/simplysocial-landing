/* ══════════════════════════════════════════════════════════════════════════
   Der Icon-Satz der Landing-Page — Phase 14.

   ── Achtung: Das ist eine KOPIE, keine Verbindung ────────────────────────
   Genau wie `stil.css` (harte Regel 13 in CLAUDE.md). Das Original steht in
   `simplysocial/src/theme/icons.ts`. Ein Pfad, der dort geändert wird, ändert
   sich HIER NICHT MIT — beides zusammen anfassen, sonst sieht die Seite eines
   Tages anders aus als die App.

   Warum kopiert und nicht importiert: Die Landing-Page hat bewusst kein npm und
   keinen Bundler (PLAN.md, Phase 9). Für sechs Dateien wäre eine Werkzeugkette
   ein Wartungsposten ohne Gegenwert. Der Preis ist genau diese Doppelung, und
   sie steht deshalb an EINER Stelle statt in jedem HTML-Tag verteilt.

   Hier stehen nur die Icons, die die Seite wirklich braucht — die sechs
   Kategorien und die Funken. Nicht der ganze Satz.
   ══════════════════════════════════════════════════════════════════════════ */

const ICON_PFADE = {
  laufen: [
    'M13.8 12a2.1 2.1 0 1 0 4.2 0a2.1 2.1 0 1 0-4.2 0',
    'M13.4 9.8 12.2 14.1l2.5 3.1-1.1 3.7',
    'M12.2 14.1 8.3 15.6l-.9 4.6',
    'M13.4 9.8l4.2 1.9 2.1-2',
  ],
  tasse: [
    'M4.6 8.6h11.8v5.5a4.7 4.7 0 0 1-4.7 4.7H9.3a4.7 4.7 0 0 1-4.7-4.7z',
    'M16.4 10h1.7a2.7 2.7 0 0 1 0 5.4h-1.7',
    'M7.4 3.4v2.2M10.5 3.4v2.2M13.6 3.4v2.2',
    'M3.6 21h14.2',
  ],
  buch: [
    'M12 7.4C10.2 5.7 7.5 5.1 4.4 5.3v12.4c3.1-.2 5.8.4 7.6 2.1',
    'M12 7.4c1.8-1.7 4.5-2.3 7.6-2.1v12.4c-3.1-.2-5.8.4-7.6 2.1',
    'M12 7.4v12.4',
  ],
  ticket: [
    'M4.4 7.4h15.2v2.8a2 2 0 0 0 0 3.6v2.8H4.4v-2.8a2 2 0 0 0 0-3.6z',
    'M12 8.8v1.4M12 11.3v1.4M12 13.8v1.4',
  ],
  baum: ['M12 3.4 6.4 11.4h3.1L5.3 17h13.4l-4.2-5.6h3.1z', 'M12 17v3.8'],
  funken: [
    'M10.4 3.6c.7 4.4 2.4 6.1 6.8 6.8-4.4.7-6.1 2.4-6.8 6.8-.7-4.4-2.4-6.1-6.8-6.8 4.4-.7 6.1-2.4 6.8-6.8z',
    'M17.8 14.4c.35 2.2 1.15 3 3.35 3.35-2.2.35-3 1.15-3.35 3.35-.35-2.2-1.15-3-3.35-3.35 2.2-.35 3-1.15 3.35-3.35z',
  ],
};

/* Die Palette hat als einziges Icon eine gefüllte Fläche (die vier Kleckse) —
   deshalb steht sie getrennt und nicht als siebter Eintrag oben. */
const ICON_FLAECHEN = {
  pinsel: [
    'M6.25 8.6a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0-2.3 0',
    'M10.25 6.9a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0-2.3 0',
    'M14.45 8.4a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0-2.3 0',
    'M5.65 13.4a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0-2.3 0',
  ],
};
ICON_PFADE.pinsel = [
  'M12 3.4a8.7 8.7 0 0 0 0 17.4c1.3 0 2.4-1.1 2.4-2.4 0-.6-.2-1.2-.6-1.6a2.4 2.4 0 0 1 1.8-4h2.3a4.7 4.7 0 0 0 4.7-4.7c0-2.6-4.7-4.7-10.6-4.7z',
];

/**
 * Ein Icon als SVG-Zeichenkette.
 *
 * `currentColor` und nicht eine feste Farbe: Dadurch nimmt das Icon die
 * Textfarbe seines Elternteils an — in einer Kategorie-Pille also automatisch
 * das `--on-soft` der jeweiligen Kategorie. Genau das konnte ein Emoji nie,
 * und genau deshalb sahen die Pillen vorher nach Aufkleber aus.
 *
 * Die Strichstärke folgt derselben Wurzel-Regel wie in der App
 * (`strichFuer` in `components/ui/SsIcon.tsx`) — sonst wären die Icons hier
 * bei 18 px sichtbar dünner als dort.
 */
function icon(name, groesse = 18) {
  const striche = ICON_PFADE[name] || [];
  const flaechen = ICON_FLAECHEN[name] || [];
  const breite = (1.9 * Math.sqrt(20 / groesse)).toFixed(2);

  return (
    `<svg class="ss-icon" width="${groesse}" height="${groesse}" viewBox="0 0 24 24" ` +
    `fill="none" stroke="currentColor" stroke-width="${breite}" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
    striche.map((d) => `<path d="${d}"/>`).join('') +
    flaechen.map((d) => `<path d="${d}" fill="currentColor" stroke="none"/>`).join('') +
    `</svg>`
  );
}

/* Die statischen Icons im HTML werden beim Laden eingesetzt: Im Markup steht
   `<span data-icon="laufen"></span>`, hier bekommt es seinen Inhalt. So steht
   kein SVG-Pfad im HTML und die Seite bleibt lesbar. */
document.querySelectorAll('[data-icon]').forEach((el) => {
  el.innerHTML = icon(el.dataset.icon, Number(el.dataset.iconGroesse) || 18);
});
