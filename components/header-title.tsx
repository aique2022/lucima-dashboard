import React from "react";
interface HeaderTitleProps {
  label: string;
}

const HeaderTitle = ({ label }: HeaderTitleProps) => {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{label}</h1>
    </div>
  );
};

export default HeaderTitle;
