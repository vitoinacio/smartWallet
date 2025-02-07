import Nav from "./Nav";
import Button from "../../utils/Button"
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="container bg-amber-50 justify-around items-center flex max-w-full p-6 relative">
      <Logo display={false} />
      <div className="flex gap-20 max-lg:flex-col max-lg:absolute max-lg:top-full max-lg:gap-10 max-lg:p-8 max-lg:bg-opacityBlack max-lg:w-full">
        <Nav className="max-lg:text-amber-50"  href="/" />
        <div className="justify-between flex gap-5 max-lg:flex-col max-lg:items-center">
          <Button text="Criar conta" className="bg-blue-800 text-amber-50 w-28 hover:bg-blue-950 p-1" />
          <Button text="Login" className="bg-amber-50 border-blue-800 border hover:bg-blue-800 p-1 text-blue-800 hover:text-amber-50 w-20" />
        </div>
      </div>
    </header>
  );
}

export default Header;