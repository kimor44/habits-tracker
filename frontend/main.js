import "./style.css";
import { TodayHabits } from "./ui/today_habits.js";
import { AddHabitDialog } from "./ui/add_habit_dialog.js";

const todayHabits = TodayHabits.getInstance();

todayHabits.init();

const addHabitDialog = AddHabitDialog.getInstance();

addHabitDialog.init();
