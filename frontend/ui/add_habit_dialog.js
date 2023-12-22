import { createHabit } from "../api/habits-api.js";
import { TodayHabits } from "./today_habits.js";

export class AddHabitDialog {
  static instance;
  constructor() {
    if (AddHabitDialog.instance) {
      throw new Error("Use AddHabitDialog.getInstance()");
    }
  }

  init() {
    this.addButtonElement = document.querySelector("#add-new-habit");
    this.dialogElement = document.querySelector("#add-habit-dialog");
    this.addHabitFormElement = document.querySelector("#add-habit-form");

    this.addButtonElement.addEventListener("click", (event) => {
      event.preventDefault();
      this.dialogElement.showModal();
    });

    this.addHabitFormElement.addEventListener("submit", (event) =>
      this.handleSubmit(event)
    );

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      this.dialogElement.close();
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.addHabitFormElement);
    const title = formData.get("title");
    try {
      await createHabit(title);
      this.dialogElement.close();
      this.addButtonElement.blur();
      TodayHabits.getInstance().refresh();
    } catch (error) {
      alert("Impossible to add habit");
    }
  }

  static getInstance() {
    if (!AddHabitDialog.instance) {
      AddHabitDialog.instance = new AddHabitDialog();
    }
    return AddHabitDialog.instance;
  }
}
