import React from "react"
import {twMerge} from "tailwind-merge"

type ButtonProps = React.ComponentProps<'button'> &{
  text: string;
}

const Button = ({text, className,...props}: ButtonProps) => {
  return (
    <button className={twMerge("items-center justify-center font-bold text-sm cursor-pointer rounded-sm duration-200", className,)} {...props}>{text}</button>
  )
}

export default Button;