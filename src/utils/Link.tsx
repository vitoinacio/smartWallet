import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  href: string;
  className: string;
}

const Link = ({href, text, className}: LinkProps) => {
  return (
      <a href={href} className={twMerge(' text-gray-500 no-underline relative hover:text-gray-700 pb-1 pt-1 after:content-[" "] after:bg-gray-700 after:w-0 after:h-0.5 after:absolute after:duration-300 after:left-0 after:bottom-0 after:rounded-sm hover:after:w-full', className)}>{text}</a>
  );
}

export default Link;