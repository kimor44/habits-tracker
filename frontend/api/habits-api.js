const baseUrl = "http://127.0.0.1:3000";

export const getHabits = () => {
  return fetch(`${baseUrl}/habits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const createHabit = (title) => {
  return fetch(`${baseUrl}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  }).then((response) => response.json());
};

export const getTodayHabits = () => {
  return fetch(`${baseUrl}/habits/today`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const updateHabitDone = (id, done) => {
  return fetch(`${baseUrl}/habits/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done,
    }),
  });
};
