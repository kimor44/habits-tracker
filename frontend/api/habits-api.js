const baseUrl = process.env.BASE_URL;

export const getHabits = () => {
  fetch(`${baseUrl}/habits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createHabit = (title) => {
  fetch(`${baseUrl}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
};

export const getTodayHabits = () => {
  fetch(`${baseUrl}/habits/today`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateHabitDone = (id, done) => {
  fetch(`${baseUrl}/habits/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done,
    }),
  });
};
