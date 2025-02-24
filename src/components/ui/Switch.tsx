import { ReactElement, useRef, useState } from "react";

interface SwitchProps {
    on: ReactElement;
    off: ReactElement;
    onClick: () => void;
}

const Switch = ({onClick, on, off} : SwitchProps) => {
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
        <span ref={ref} className="bg-slate-300 w-11 h-6 rounded-xl border border-slate-300 flex items-center">
            <button className="w-5 h-5 rounded-xl bg-white flex items-center justify-center " onClick={handleEvent}>
                {isOn ? on : off }
            </button>    
        </span>      
    </>
  )
}

export default Switch;