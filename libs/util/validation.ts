export const isEmail = (email: string) => {
  if (!email) return false;
  const emailRex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRex.test(email);
};
