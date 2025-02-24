import  { useState, useEffect } from "react";

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<boolean>(window.innerWidth < 1024);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 100);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth < 1065);
  };

  useEffect(() => {
    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isScrolled, windowWidth};
};

export default useScroll;