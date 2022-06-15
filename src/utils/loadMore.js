export const disableButton = (prev, step, total) => {
  if (prev + step > total) {
    return true;
  }
  return false;
};
