import { twMerge } from "tailwind-merge";
import Icon from "./Icon"

interface LogoProps{
  display: boolean;
  className: string;
}

const Logo = ({display, className}: LogoProps) => {
  return (
    <div className="conatiner flex items-center">
      <Icon />
      {display && 
      <>
        <p className={twMerge('text-blue-700 font-bold text-2xl', className)}>mart</p>
        <p className={twMerge('text-blue-700 font-bold text-2xl', className)}>Wallet</p>
      </>}
    </div>
  )
}

export default Logo;