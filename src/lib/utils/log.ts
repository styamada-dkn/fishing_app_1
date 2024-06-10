export const __clog = (...output: string[]): void => {
  if (process.env.NEXT_PUBLIC_ENV !== "dev") {
    return;
  }
  console.log(...output);
};
