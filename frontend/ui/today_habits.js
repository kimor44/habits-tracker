import { getTodayHabits, updateHabitDone } from "../api/habits-api.js";
import { HabitSquare } from "./habit_square.js";

export class TodayHabits {
  static instance;
  constructor() {
    if (TodayHabits.instance) {
      throw new Error("Use TodayHabits.getInstance()");
    }
  }

  init() {
    this.element = document.querySelector("#today-habits");
    this.refresh();
  }

  async refresh() {
    try {
      this.habitSquares?.forEach((habitSquare) => {
        habitSquare.removeEventListener("toggle", this.toggle);
      });
      this.todayHabits = await getTodayHabits();
      this.render();
    } catch (error) {
      alert("Impossible to get today habits");
    }
  }

  async toggleDone(id, done) {
    try {
      await updateHabitDone(id, done);
      this.refresh();
    } catch (error) {
      alert("Impossible to update habit");
    }
  }

  toggle(event) {
    const habitSquare = event.currentTarget;
    this.toggleDone(habitSquare.id, !habitSquare.done);
  }

  async render() {
    this.element.innerHTML = "";
    this.habitSquares = this.todayHabits.map((habit) => {
      const habitSquare = new HabitSquare(habit.id, habit.title, habit.done);
      habitSquare.addEventListener("toggle", (event) => this.toggle(event));
      this.element.appendChild(habitSquare.element);
      return habitSquare;
    });
  }

  static getInstance() {
    if (!TodayHabits.instance) {
      TodayHabits.instance = new TodayHabits();
    }
    return TodayHabits.instance;
  }
}
