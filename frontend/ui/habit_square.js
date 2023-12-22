export class HabitSquare extends EventTarget {
  /**
   * Represents a habit square.
   * @constructor
   * @param {number} id - The habit id
   * @param {string} title - The habit title
   * @param {boolean} done - The habit's status
   */
  constructor(id, title, done) {
    super();
    this.id = id;
    this.title = title;
    this.done = done;

    this.element = createElement(this.title, this.done);

    this.element.addEventListener("click", () => {
      const event = new CustomEvent("toggle");
      this.dispatchEvent(event);
    });
  }
}

const createElement = (title, done) => {
  const element = document.createElement("button");
  element.classList.add("habit-square");
  if (done) {
    element.classList.add("habit-done");
  }

  const titleElement = createTitleElement(title);
  element.appendChild(titleElement);

  const doneElement = createDoneElement(done);
  element.appendChild(doneElement);

  return element;
};

const createTitleElement = (title) => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;
  return titleElement;
};

const createDoneElement = (done) => {
  const doneElement = document.createElement("span");
  doneElement.innerText = done ? "✅" : "❌";
  return doneElement;
};
