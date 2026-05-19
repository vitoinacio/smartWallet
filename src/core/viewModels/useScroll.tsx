import { useState, useEffect } from "react";

interface UseScrollResult {
  isScroll: boolean;
}

const useScroll = (): UseScrollResult => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleScroll = (): void => {
    const scrollPosition: number = window.scrollY;
    setIsScroll(scrollPosition > 100);
  };

  useEffect((): (() => void) => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScroll };
};

export default useScroll;