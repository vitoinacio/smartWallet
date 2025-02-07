import Icon from "./Icon"

interface LogoProps{
  display: boolean;
}

const Logo = ({display}: LogoProps) => {
  return (
    <div className="conatiner flex items-center">
      <Icon />
      {display && 
      <>
        <p className="text-blue-700 font-bold text-2xl ">mart</p>
        <p className="text-blue-700 text-2xl">Wallet</p>
      </>}
    </div>
  )
}

export default Logo;