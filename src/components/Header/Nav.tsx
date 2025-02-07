import Link from "../../utils/Link";

interface NavProps {
  className: string;
  href:string;
}

const Nav = ({className, href}: NavProps) => {
  return (
    <nav className="flex gap-5 max-lg:flex-col justify-center items-center">
      <Link text="Quem somos ?" className={className} href={href}/>
      <Link text="O que oferecemos ?" className={className} href={href}/>
      <Link text="Conheça nosso metódo" className={className} href={href}/>
    </nav>
  );
}

export default Nav;