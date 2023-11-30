export const getEnv = (key: string, fallback?: string): string => {
  const env = import.meta.env["VITE_" + key];
  if (!env) {
    if (fallback) return fallback;
    console.error(`Environment variable ${key} is not defined`);
  }
  return env;
};
