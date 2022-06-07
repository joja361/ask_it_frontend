export const saveTokenAndUser = (token, email) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
};

export const getTokenAndUser = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  return { token, email };
};

export const deleteTokenAndUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};
