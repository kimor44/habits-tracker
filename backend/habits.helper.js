import path from "path";
import fs from "fs/promises";

const habitsPath = path.join(process.cwd(), "./database.json");
const todayString = () => new Date().toISOString().slice(0, 10);

const getHabits = async () => {
  const habitsFile = await fs.readFile(habitsPath);
  return JSON.parse(habitsFile.toString());
};

const getTodayHabits = async () => {
  const habitsFile = await fs.readFile(habitsPath);
  const habits = JSON.parse(habitsFile.toString()).habits;
  const today = todayString();
  const habitsWithDoneStats = Object.values(habits).map((habit) => {
    return {
      ...habit,
      done: habit.daysDone[today] || false,
    };
  });
  return JSON.stringify(habitsWithDoneStats);
};

const addHabit = async (title) => {
  const habitsFile = await fs.readFile(habitsPath);
  const habits = JSON.parse(habitsFile.toString()).habits;
  const newHabit = {
    id: habits[habits.length - 1]?.id + 1 || 0,
    title,
    daysDone: {},
  };

  const newHabitsContent = { habits: [...habits, newHabit] };

  await fs.writeFile(habitsPath, JSON.stringify(newHabitsContent, null, 2));
};

const updateHabit = async (id, done) => {
  const habitsFile = await fs.readFile(habitsPath);
  const habits = JSON.parse(habitsFile.toString()).habits;
  const habitIndex = Object.values(habits).findIndex(
    (habit) => habit.id === id
  );
  if (habitIndex === -1) {
    throw new Error("Habit not found");
  }
  const habitToUpdate = habits[habitIndex];
  const today = todayString();
  if (done) {
    habitToUpdate.daysDone[today] = true;
  } else {
    delete habitToUpdate.daysDone[today];
  }
  const newHabitsContent = { habits: [...habits] };

  await fs.writeFile(habitsPath, JSON.stringify(newHabitsContent, null, 2));
};

export { getHabits, getTodayHabits, addHabit, updateHabit };
