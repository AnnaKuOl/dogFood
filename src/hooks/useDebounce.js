import { useEffect, useState } from "react";

const useDebounce = (value = "", delay) => {
  const [valueDebounce, setValueDebounce] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValueDebounce(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return valueDebounce;
};

export default useDebounce;
