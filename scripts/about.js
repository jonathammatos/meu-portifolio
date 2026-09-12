/* ============ TYPEWRITERS ============ */
(function () {
  "use strict";

  /* --- Nome --- */
  var nameEl = document.getElementById("name");
  if (nameEl) {
    var text = "Jonathan Matos";
    var i = 0;

    var typeName = function () {
      if (i <= text.length) {
        nameEl.textContent = text.substring(0, i);
        i++;
        setTimeout(typeName, 130);
      }
    };
    setTimeout(typeName, 300);
  }

  /* --- Role (loop) --- */
  var roleEl = document.getElementById("role");
  if (roleEl) {
    var words = [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "Sass",
      "React",
      "Next.js",
    ];
    var wi = 0,
      char = 0,
      deleting = false;

    var tick = function () {
      var word = words[wi];

      if (!deleting) {
        roleEl.textContent = word.substring(0, char + 1);
        char++;
        if (char === word.length) {
          deleting = true;
          return setTimeout(tick, 1400);
        }
        setTimeout(tick, 110);
      } else {
        roleEl.textContent = word.substring(0, char - 1);
        char--;
        if (char === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          return setTimeout(tick, 350);
        }
        setTimeout(tick, 55);
      }
    };
    setTimeout(tick, 2200);
  }
})();

/* ============ TERMINAL DE STATUS ============ */
(function () {
  "use strict";

  var el = document.getElementById("terminal-text");
  if (!el) return;

  var phrases = [
    " Dev front-end.",
    " Café e código.",
    " Código limpo.",
    " Sempre evoluindo.",
    " Vamos conversar?",
  ];

  var phraseIdx = 0;
  var charIdx = 0;
  var deleting = false;
  var pause = 0;

  /* Delay aleatório entre dois valores (ritmo humano) */
  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function tick() {
    var word = phrases[phraseIdx];

    /* pausa longa entre frases / antes de apagar */
    if (pause > 0) {
      pause--;
      return setTimeout(tick, rnd(80, 140));
    }

    if (!deleting) {
      /* digitando */
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === word.length) {
        deleting = true;
        /* pausa longa com a frase completa (como se estivesse lendo) */
        pause = rnd(20, 35);
        return setTimeout(tick, rnd(80, 140));
      }

      /* delay variável: normalmente rápido, com solavancos ocasionais */
      var typingDelay = rnd(90, 180);

      /* 15% de chance de pausa "pensando" no meio da palavra */
      if (Math.random() < 0.15) {
        typingDelay = rnd(300, 600);
      }

      setTimeout(tick, typingDelay);
    } else {
      /* apagando — sempre rápido (backspace nervoso) */
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pause = rnd(3, 6);
        return setTimeout(tick, rnd(80, 140));
      }
      setTimeout(tick, rnd(40, 80));
    }
  }

  setTimeout(tick, 800);
})();
