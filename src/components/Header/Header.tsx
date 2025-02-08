import React from 'react';
import { CgClose } from 'react-icons/cg';
import { SlMenu } from 'react-icons/sl';
import Button from '../../utils/Button';
import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
  const headerRef = React.useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(false);
  const [hasMenu, setHasMenu] = React.useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 100);
    handlePosition(scrollPosition);
  };

  const handlePosition = (position: number) => {
    const newPosition = position; 
    let previousPosition = 0;

    if (newPosition != previousPosition) {
      setHasMenu(false);
    }
    previousPosition = newPosition;
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth < 1024);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenu = () => {
    setHasMenu(!hasMenu);
  };

  return (
    <header
      ref={headerRef}
      className={`container fixed flex justify-around items-center max-w-full duration-500 ${
        isScrolled ? 'bg-blue-800 p-4' : 'bg-amber-50 p-6'
      }`}
    >
      {windowWidth ? (
        <>
          <Logo
            display={false}
            className={`${isScrolled ? 'text-amber-50' : ''}`}
          />
        </>
      ) : (
        <Logo
          display={true}
          className={`${isScrolled ? 'text-amber-50' : ''}`}
        />
      )}
      <div
        className={`gap-20 flex max-lg:flex-col max-lg:absolute max-lg:top-full max-lg:overflow-hidden max-lg:gap-10 max-lg:p-8 max-lg:bg-opacityBlack max-lg:w-full ${windowWidth && hasMenu ? 'max-lg:h-auto max-lg:flex max-lg:animate-dow':'max-lg:h-0 max-lg:hidden max-lg:animate-up'} `}
      >
        <Nav
          className={`${
            isScrolled
              ? 'text-amber-50 hover:text-amber-50 after:bg-amber-50'
              : 'max-lg:text-amber-50'
          }`}
          href='/'
        />
        <div className='justify-between flex gap-5 max-lg:flex-col max-lg:items-center'>
          <Button
            text='Criar conta'
            className={`bg-blue-800 text-amber-50 w-28 hover:bg-blue-950 p-1 ${
              isScrolled ? 'border border-amber-50' : ''
            }`}
          />
          <Button
            text='Login'
            className={`bg-amber-50 p-1 border hover:bg-blue-950 text-blue-800 hover:text-amber-50 w-20`}
          />
        </div>
      </div>
      {windowWidth && (
        hasMenu ? (
          <CgClose
            className={`size-8 cursor-pointer ${isScrolled ? 'text-amber-50' : 'text-black'}`}
            onClick={handleMenu}
          />
        ) : (
          <SlMenu
            className={`size-8 cursor-pointer ${isScrolled ? 'text-amber-50' : 'text-black'}`}
            onClick={handleMenu}
          />
        )
      )}
    </header>
  );
};

export default Header;
