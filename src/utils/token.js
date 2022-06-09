export const saveUserData = (token, email, userId) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("userId", userId);
};

export const getUserData = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  return { token, email, userId };
};

export const deleteUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
};
