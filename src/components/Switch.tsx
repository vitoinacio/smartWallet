import { cn } from "@/lib/utils";
import { ReactElement, useRef, useState } from "react";

interface SwitchProps {
    on: ReactElement;
    off: ReactElement;
    className?: string;
    onClick: () => void;
}

const Switch = ({onClick, on, off, className} : SwitchProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [isOn, setIsOn] = useState(true);

    const handleEvent = () => {
        const target = ref.current;
        if (target) {
            if (!isOn) {
                setIsOn(true);
                target.style.justifyContent = "start";
            } else {
                setIsOn(false);
                target.style.justifyContent = "end";
            }
        }
        onClick();
    };

  return (
    <>
        <span ref={ref} className={cn("bg-slate-300 w-11 h-6 rounded-xl border border-slate-300 flex items-center", className)}>
            <button className="w-5 h-5 rounded-xl bg-white flex items-center justify-center " onClick={handleEvent}>
                {isOn ? on : off }
            </button>    
        </span>      
    </>
  )
}

export default Switch;