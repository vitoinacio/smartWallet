import {useEffect, useState } from "react"

interface UseThemeReturn {
    handleTheme: () => void;
    theme: 'light' | 'dark';
  }
  

const useTheme = () : UseThemeReturn => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const html = document.querySelector('#html')

    const handleTheme = () => {
        if (html) {
           if (theme === 'light') {
                html.classList.remove('light')
                html.classList.add('dark')
                setTheme('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                html.classList.remove('dark')
                html.classList.add('light')
                setTheme('light')
                localStorage.setItem('theme', 'light')
            }
        } 
    }

    useEffect(()=>{
        if (html) {
            const themeInitial = localStorage.getItem('theme')
            if (themeInitial !== null) {
                html.classList.add(themeInitial)
            }
        }
    },[html])

  return {handleTheme, theme};
}

export default useTheme;