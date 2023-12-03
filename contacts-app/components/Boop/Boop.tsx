"use client";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
type BoopProps = {
  rotation?: number;
  timing?: number;
} & React.PropsWithChildren;

export default function Boop({
  rotation = 0,
  timing = 150,
  children,
}: BoopProps) {
  const [isBooped, setIsBooped] = useState(false);
  const style = useSpring({
    display: "inline-block",
    transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
  });

  useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = () => {
    setIsBooped(true);
  };
  return (
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
}
