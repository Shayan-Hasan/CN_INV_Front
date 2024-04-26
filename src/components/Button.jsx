import React from "react";

const button = ({
  bgColor,
  color,
  size,
  text,
  borderRadius,
  onClick,
  padding,
  margin,
  disabled,
}) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor: bgColor,
        color,
        borderRadius,
        padding,
        margin,
        disabled: true,
      }}
      className={`text-${size} pt-2 pb-2 pl-3 pr-3 hover:drop-shadow-xl`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default button;
