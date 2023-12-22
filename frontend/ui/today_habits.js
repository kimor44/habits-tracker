import { getTodayHabits, updateHabitDone } from "../api/habits-api.js";
import { HabitSquare } from "./habit_square.js";

export class TodayHabits {
  constructor() {}

  init() {
    this.element = document.querySelector("#today-habits");
    this.refresh();
  }

  async refresh() {
    try {
      this.todayHabits = await getTodayHabits();
      this.render();
    } catch (error) {
      alert("Impossible to get today habits");
    }
  }

  async toggle(id, done) {
    try {
      await updateHabitDone(id, done);
      this.refresh();
    } catch (error) {
      alert("Impossible to update habit");
    }
  }

  async render() {
    this.element.innerHTML = "";
    this.habitSquares = this.todayHabits.map((habit) => {
      const habitSquare = new HabitSquare(habit.id, habit.title, habit.done);
      habitSquare.addEventListener("toggle", () => {
        this.toggle(habit.id, !habit.done);
      });
      this.element.appendChild(habitSquare.element);
    });
  }
}
