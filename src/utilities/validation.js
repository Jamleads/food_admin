export const validateForm = (formState) => {
  for (const key in formState) {
    if (formState[key].trim() === "") {
      return false;
    }
  }
  return true;
};

export const validateForm2 = (formState) => {
  for (const key in formState) {
    if (
      formState[key] === "" ||
      formState[key] === null ||
      formState[key].length === 0
    ) {
      return false;
    }
  }
  return true;
};
