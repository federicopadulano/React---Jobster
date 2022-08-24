const addToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getFromLocalStorage = () => {
  const item = localStorage.getItem("user");
  const user = item ? JSON.parse(item) : null;
  return user;
};

const removeFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
