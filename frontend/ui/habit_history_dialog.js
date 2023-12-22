import { getHabits } from "../api/habits-api.js";

export class HabitHistoryDialog {
  static instance;
  constructor() {
    if (HabitHistoryDialog.instance) {
      throw new Error("Use HabitHistoryDialog.getInstance()");
    }
  }
  init() {
    this.historyButton = document.querySelector("#open-history");
    this.habitHistoryDialog = document.querySelector("#habits-history-dialog");
    this.tableWrapper = document.querySelector("#table-wrapper");

    this.historyButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.habitHistoryDialog.showModal();
      this.render();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      this.habitHistoryDialog.close();
    });
  }

  async render() {
    this.tableWrapper.innerHTML = "";
    const habitHistory = await getHabits();
    const oldestDate = this.getOldestDate(habitHistory);
    const dateRange = this.getDateRange(oldestDate);
    const table = this.createTable(dateRange, habitHistory);
    this.tableWrapper.appendChild(table);
  }

  getOldestDate(habitHistory) {
    const earliestDate = habitHistory
      .map((habit) => {
        const habitDates = Object.keys(habit.daysDone);
        if (habitDates.length > 0) {
          return habitDates.reduce((a, b) => (a < b ? a : b));
        } else {
          return new Date().toISOString().slice(0, 10);
        }
      })
      .reduce((a, b) => (a < b ? a : b));
    return earliestDate;
  }

  getDateRange(oldestDate) {
    const today = new Date();
    const oldest = new Date(oldestDate);
    const dateRange = [];
    for (let date = oldest; date <= today; date.setDate(date.getDate() + 1)) {
      dateRange.push(date.toISOString().slice(0, 10));
    }
    return dateRange;
  }

  createTable(dateRange, habitHistory) {
    const table = document.createElement("table");
    const tabHeaders = this.createTHead(dateRange);
    table.appendChild(tabHeaders);
    const tabBodies = this.createTBody(dateRange, habitHistory);
    tabBodies.forEach((body) => {
      table.appendChild(body);
    });

    return table;
  }

  createTHead(dateRange) {
    const headerRows = document.createElement("tr");
    const headerTitle = document.createElement("th");
    headerTitle.innerText = "Habit";
    headerRows.appendChild(headerTitle);
    dateRange.forEach((date) => {
      const dateHeader = document.createElement("th");
      dateHeader.innerText = date;
      headerRows.appendChild(dateHeader);
    });
    return headerRows;
  }

  createTBody(dateRange, habitHistory) {
    const tBodies = habitHistory.map((habit) => {
      let habitRow = document.createElement("tr");
      const habitTitle = document.createElement("td");
      habitTitle.innerText = habit.title;
      habitRow.appendChild(habitTitle);
      habitRow = this.insertRows(dateRange, habit, habitRow);
      return habitRow;
    });
    return tBodies;
  }

  insertRows(dateRange, habit, habitRow) {
    dateRange.forEach((date) => {
      const row = document.createElement("td");
      const status = habit.daysDone[date];
      if (status) {
        row.innerText = "✅";
      } else {
        row.innerText = "❌";
      }
      habitRow.appendChild(row);
    });
    return habitRow;
  }

  static getInstance() {
    if (!HabitHistoryDialog.instance) {
      HabitHistoryDialog.instance = new HabitHistoryDialog();
    }
    return HabitHistoryDialog.instance;
  }
}
