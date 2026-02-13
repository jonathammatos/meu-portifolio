function typeWrite(texto, index, indexTexto, isDeleting, id, loop) {
  const typewrite = document.querySelector(`#${id}`);
  const currentText = texto[indexTexto];

  if (!isDeleting && index <= currentText.length) {
    typewrite.textContent = currentText.substring(0, index);

    setTimeout(
      () => typeWrite(texto, index + 1, indexTexto, isDeleting, id, loop),
      200,
    );
  } else if (isDeleting && index >= 0) {
    typewrite.textContent = currentText.substring(0, index);

    setTimeout(
      () => typeWrite(texto, index - 1, indexTexto, isDeleting, id, loop),
      200,
    );
  } else {
    if (loop) return;

    if (!isDeleting) {
      setTimeout(
        () => typeWrite(texto, index, indexTexto, true, id, false),
        1200,
      );
    } else {
      const proximoTexto = (indexTexto + 1) % texto.length;
      setTimeout(
        () => typeWrite(texto, 0, proximoTexto, false, id, false),
        500,
      );
    }
  }
}

typeWrite(["Jonathan Matos"], 0, 0, false, "name", true);

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Bootstrap",
  " Sass",
  "React ",
  "Next.js",
];

typeWrite(skills, 0, 0, false, "tac-animation", false);
