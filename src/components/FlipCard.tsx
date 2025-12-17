import React, { useEffect, useState } from "react";
import { StaticCard, AnimatedFlaps } from "./FlipCardParts";

interface FlipCardProps {
  digit: string;
  textColor?: string;
  cardColor?: string; // Hex
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number | string;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent) => void;
  splitLine?: boolean;
}

const FlipCard: React.FC<FlipCardProps> = React.memo(
  ({
    digit,
    textColor = "#FFFFFF",
    cardColor = "#333333",
    fontFamily = "sans-serif",
    fontSize,
    fontWeight = 700,
    borderRadius,
    onClick,
    splitLine = true,
  }) => {
    const [currentDigit, setCurrentDigit] = useState(digit);
    const [previousDigit, setPreviousDigit] = useState(digit);
    const [isFlipping, setIsFlipping] = useState(false);

    const ANIM_DURATION = 600;

    useEffect(() => {
      if (digit !== currentDigit) {
        setPreviousDigit(currentDigit);
        setCurrentDigit(digit);
        setIsFlipping(true);

        const timeout = setTimeout(() => {
          setIsFlipping(false);
          setPreviousDigit(digit);
        }, ANIM_DURATION);

        return () => clearTimeout(timeout);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [digit]);

    const cardStyle: React.CSSProperties = {
      backgroundColor: cardColor,
      color: textColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
    };

    // Always show gap/split for the demo
    const GAP_SIZE = splitLine ? "5px" : "0px";
    const halfHeightClass = splitLine ? "h-[calc(50%-1px)]" : "h-[50%]";

    return (
      <div
        className="relative w-full h-full flex flex-col justify-between perspective-1000 group cursor-pointer select-none"
        onClick={onClick}
        style={{ borderRadius }}
      >
        <StaticCard
          position="top"
          digit={currentDigit}
          style={cardStyle}
          borderRadius={borderRadius}
          halfHeightClass={halfHeightClass}
        />

        {splitLine && <div className="w-full" style={{ height: GAP_SIZE }} />}

        <StaticCard
          position="bottom"
          digit={isFlipping ? previousDigit : currentDigit}
          style={cardStyle}
          borderRadius={borderRadius}
          halfHeightClass={halfHeightClass}
        />

        {isFlipping && (
          <AnimatedFlaps
            currentDigit={currentDigit}
            previousDigit={previousDigit}
            style={cardStyle}
            borderRadius={borderRadius}
            halfHeightClass={halfHeightClass}
            animDuration={ANIM_DURATION}
            backgroundColor={cardColor}
          />
        )}

        <style>{`
        @keyframes flipTop {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }
        @keyframes flipBottom {
          0% { transform: rotateX(180deg); }
          100% { transform: rotateX(0deg); }
        }
        @keyframes shadowTop {
            0% { opacity: 0; }
            100% { opacity: 0.6; }
        }
      `}</style>
      </div>
    );
  }
);

export default FlipCard;
