# SimplySocial — Landing-Page

Die Seite, die erklärt, was SimplySocial ist, und auf den Prototyp führt.

**Live:** https://ianfhorak-jpg.github.io/simplysocial-landing/
**Prototyp:** https://ianfhorak-jpg.github.io/simplysocial/

## Kein Build

Reines HTML, CSS und ein bisschen JavaScript. Kein npm, kein Bundler, kein Framework.
Was hier liegt, ist das, was ausgeliefert wird — `git push` genügt, GitHub Pages nimmt
den `main`-Zweig direkt.

    index.html      Inhalt
    stil.css        Gestaltung — Farben und Abstände aus der App übernommen
    seite.js        Farbband, Auftauchen beim Scrollen, Konfetti
    schriften.css   @font-face
    schriften/      die Schriftdateien, selbst gehostet

## Zwei Sachen, die man wissen muss

**Die Farben sind nicht neu erfunden.** Sie stehen in `simplysocial/src/theme/colors.ts`
und sind hier als CSS-Variablen wiederholt, samt der 4px-Tiefe an den Knöpfen. Wird dort
etwas umgestellt, gehört es hier nachgezogen — sonst driften Seite und App auseinander.

**Die Schriften liegen im Repo, sie werden nicht von Google geladen.** Wer Google Fonts
direkt einbindet, schickt die IP jedes Besuchers an Google; in der EU ist das ein
DSGVO-Problem. Begründung steht im Kopf von `schriften.css`.
