import { useState, useEffect } from "react";

const usePersist = (
  key?: string
): [
  boolean | object | unknown,
  React.Dispatch<React.SetStateAction<boolean | object | unknown>>
] => {
  const [persist, setPersist] = useState<boolean | object | unknown>(
    JSON.parse(localStorage.getItem(key || "persist") || "false")
  );

  function setStorage() {
    localStorage.setItem(key || "persist", JSON.stringify(persist));
  }

  useEffect(() => {
    setStorage();
  }, [persist, key]);

  return [persist, setPersist];
};

export default usePersist;
