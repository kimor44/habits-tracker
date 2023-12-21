import path from "path";
import fs from "fs/promises";

const habitsPath = path.join(process.cwd(), "./database.json");
const todayString = () => new Date().toISOString().slice(0, 10);

const readDatabase = async () => {
  const databaseFile = await fs.readFile(habitsPath, "utf-8");
  return JSON.parse(databaseFile);
};

const writeDatabase = async (newDatabase) => {
  const databaseFile = await fs.readFile(habitsPath, "utf-8");
  const database = JSON.parse(databaseFile);

  await fs.writeFile(
    habitsPath,
    JSON.stringify({ ...database, ...newDatabase }, null, 2)
  );
};

export const getHabits = async () => {
  const habitsDatabase = await readDatabase();

  return habitsDatabase.habits;
};

export const getTodayHabits = async () => {
  const today = todayString();
  const habits = await getHabits();
  const habitsWithDoneStats = habits.map((habit) => {
    return {
      id: habit.id,
      title: habit.title,
      done: habit.daysDone[today] || false,
    };
  });
  return habitsWithDoneStats;
};

export const addHabit = async (title) => {
  const habits = await getHabits();
  const newHabit = {
    id: habits[habits.length - 1]?.id + 1 || 0,
    title,
    daysDone: {},
  };

  habits.push(newHabit);

  await writeDatabase({ habits });

  return newHabit;
};

export const updateHabit = async (id, done) => {
  const habits = await getHabits();
  const habitToUpdate = habits.find((habit) => habit.id === id);

  if (!habitToUpdate) {
    throw new Error("Habit ID is invalid");
  }

  const today = todayString();

  if (done) {
    habitToUpdate.daysDone[today] = true;
  } else {
    delete habitToUpdate.daysDone[today];
  }

  await writeDatabase({ habits });

  return habitToUpdate;
};
