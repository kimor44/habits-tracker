import path from "path";
import fs from "fs/promises";

const habitsPath = path.join(process.cwd(), "./database.json");
const todayString = () => new Date().toISOString().slice(0, 10);

const getHabits = async () => {
  const habitsFile = await fs.readFile(habitsPath);
  return JSON.parse(habitsFile.toString());
};

const getTodayHabits = async () => {
  const habits = await getHabits();
  const today = todayString();
  return habits.map((habit) => ({
    ...habit,
    done: habit.daysDone[today] === true,
  }));
};

const addHabit = async (title) => {
  const habitsFile = await fs.readFile(habitsPath);
  const habits = JSON.parse(habitsFile.toString());
  const newHabit = {
    id: habits[habits.length - 1]?.id || 0,
    title,
    daysDone: {},
  };

  await fs.writeFile(
    habitsPath,
    JSON.stringify([...habits, newHabit], null, 2)
  );
};

const updateHabit = async (id, done) => {
  const habitsFile = await fs.readFile(habitsPath);
  const habits = JSON.parse(habitsFile.toString());
  const habitIndex = habits.findIndex((habit) => habit.id === id);
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
  await fs.writeFile(
    habitsPath,
    JSON.stringify([...habits, habitToUpdate], null, 2)
  );
};

export { getHabits, getTodayHabits, addHabit, updateHabit };
