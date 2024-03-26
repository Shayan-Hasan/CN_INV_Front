import React from "react";

const Header = ({ category, title }) => {
  return (
    <div className="mb-0 ml-8">
      <span className="text-gray-400">{category}</span>
      <p className="text-3xl font-bold tracking-tight text-slate-800">
        {title}
      </p>
    </div>
  );
};

export default Header;
