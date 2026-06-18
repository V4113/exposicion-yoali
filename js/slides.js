(function () {
  "use strict";

  const iconPositions = ["one", "two"];

  function createElement(tagName, className, text) {
    // Helper peque&ntilde;o para crear nodos sin repetir la misma l&oacute;gica en cada render.
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined) {
      element.textContent = text;
    }
    return element;
  }

  function renderBulletList(items) {
    const list = createElement("ul", "bullet-list");
    items.forEach((item) => {
      const listItem = document.createElement("li");
      const icon = createElement("span", "bullet-icon", item.icon);
      const text = document.createTextNode(item.text);
      listItem.append(icon, text);
      list.appendChild(listItem);
    });
    return list;
  }

  function renderBadges(badges) {
    const row = createElement("div", "badge-row");
    badges.forEach((badge) => {
      row.appendChild(createElement("div", "badge", badge));
    });
    return row;
  }

  function renderSpeakerNote(noteText) {
    const note = createElement("div", "note");
    note.appendChild(createElement("strong", null, "Para decir:"));
    note.appendChild(createElement("p", null, noteText));
    return note;
  }

  function renderQuestions(questions) {
    const grid = createElement("div", "qa-grid");
    questions.forEach((item, index) => {
      const questionCard = createElement("div", "qa-card");
      questionCard.appendChild(createElement("b", null, `Pregunta ${index + 1}`));
      questionCard.appendChild(createElement("p", null, item.question));

      const answerCard = createElement("div", "qa-card");
      answerCard.appendChild(createElement("b", null, "Respuesta"));
      answerCard.appendChild(createElement("p", null, item.answer));

      grid.append(questionCard, answerCard);
    });
    return grid;
  }

  function renderSources(sources) {
    const paragraph = createElement("p", "sources");
    paragraph.appendChild(document.createTextNode("Im\u00e1genes: "));

    sources.forEach((source, index) => {
      const link = createElement("a", null, source.label);
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      paragraph.appendChild(link);
      paragraph.appendChild(document.createTextNode(index === sources.length - 1 ? "." : ", "));
    });

    return paragraph;
  }

  function renderImage(image) {
    const cardClass = image.variant === "tall" ? "photo-card tall" : "photo-card";
    const card = createElement("div", cardClass);
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.loading = "eager";
    card.appendChild(img);
    return card;
  }

  function renderVisual(slide, index) {
    const visual = createElement("div", "visual");

    if (slide.image) {
      visual.appendChild(renderImage(slide.image));
    }

    if (slide.floatingIcon) {
      const position = iconPositions[index % iconPositions.length];
      visual.appendChild(createElement("div", `plane ${position}`, slide.floatingIcon));
    }

    return visual;
  }

  function renderSlide(slide, index) {
    // Cada propiedad del JSON es opcional excepto title; esto facilita agregar diapositivas simples.
    const section = createElement("section", index === 0 ? "slide active" : "slide");
    const content = createElement("div", "content");

    if (slide.kicker) {
      content.appendChild(createElement("div", "kicker", slide.kicker));
    }

    content.appendChild(createElement(index === 0 ? "h1" : "h2", null, slide.title));

    if (slide.subtitle) {
      content.appendChild(createElement("p", "big-line", slide.subtitle));
    }

    if (slide.badges) {
      content.appendChild(renderBadges(slide.badges));
    }

    if (slide.bullets) {
      content.appendChild(renderBulletList(slide.bullets));
    }

    if (slide.questions) {
      content.appendChild(renderQuestions(slide.questions));
    }

    if (slide.note) {
      content.appendChild(renderSpeakerNote(slide.note));
    }

    if (slide.sources) {
      content.appendChild(renderSources(slide.sources));
    }

    section.append(content, renderVisual(slide, index));

    if (slide.ribbon) {
      section.appendChild(createElement("div", "ribbon"));
    }

    return section;
  }

  window.YoaliSlides = {
    renderSlide,
  };
})();
