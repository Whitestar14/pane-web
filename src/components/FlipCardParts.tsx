import React from "react";

interface CommonProps {
  digit: string;
  style: React.CSSProperties;
  borderRadius?: string;
  halfHeightClass: string;
}

export const StaticCard: React.FC<
  CommonProps & {
    position: "top" | "bottom";
    singleCard?: boolean;
    textAnimation?: string;
  }
> = ({
  digit,
  style,
  borderRadius,
  halfHeightClass,
  position,
  singleCard,
  textAnimation,
}) => {
  const isTop = position === "top";

  // Radius Logic
  const radiusStyle = singleCard
    ? {
        borderRadius: borderRadius,
      }
    : isTop
    ? {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      };

  const contentStyle: React.CSSProperties = singleCard
    ? {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : {
        position: "absolute",
        left: 0,
        width: "100%",
        height: "200%",
        top: isTop ? 0 : "auto",
        bottom: !isTop ? 0 : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };

  return (
    <div
      className={`w-full ${halfHeightClass} overflow-hidden relative transition-colors duration-300`}
      style={{
        ...style,
        ...radiusStyle,
      }}
    >
      <div
        style={{
          ...contentStyle,
          fontSize: style.fontSize,
          lineHeight: 1,
          animation: textAnimation,
        }}
        className="tracking-tight"
      >
        {digit}
      </div>
    </div>
  );
};

export const AnimatedFlaps: React.FC<{
  currentDigit: string;
  previousDigit: string;
  style: React.CSSProperties;
  borderRadius?: string;
  halfHeightClass: string;
  animDuration: number;
  backgroundColor: string;
}> = ({
  currentDigit,
  previousDigit,
  style,
  borderRadius,
  halfHeightClass,
  animDuration,
  backgroundColor,
}) => {
  const animNameTop = "flipTop";
  const animNameBottom = "flipBottom";

  const innerContentStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "200%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: style.fontSize,
    lineHeight: 1,
  };

  return (
    <>
      {/* Top Flap */}
      <div
        key={`top-${previousDigit}`}
        className={`absolute top-0 left-0 w-full ${halfHeightClass} overflow-hidden z-20 origin-bottom backface-hidden`}
        style={{
          ...style,
          backgroundColor,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          animation: `${animNameTop} ${animDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          willChange: "transform, opacity",
        }}
      >
        {/* Content aligned to top */}
        <div
          style={{ ...innerContentStyle, top: 0 }}
          className="tracking-tight"
        >
          {previousDigit}
        </div>

        {/* Shadow Overlay */}
        <div
          className="absolute inset-0 bg-black pointer-events-none z-30"
          style={{ animation: `shadowTop ${animDuration}ms linear forwards` }}
        />
      </div>

      {/* Bottom Flap */}
      <div
        key={`bottom-${currentDigit}`}
        className={`absolute bottom-0 left-0 w-full ${halfHeightClass} overflow-hidden z-20 origin-top backface-hidden`}
        style={{
          ...style,
          backgroundColor,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          transform: "rotateX(180deg)",
          animation: `${animNameBottom} ${animDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          willChange: "transform, opacity",
        }}
      >
        {/* Content aligned to bottom */}
        <div
          style={{ ...innerContentStyle, bottom: 0 }}
          className="tracking-tight"
        >
          {currentDigit}
        </div>
      </div>
    </>
  );
};
