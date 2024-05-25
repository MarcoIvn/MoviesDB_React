import React, { ReactNode } from "react";

interface HomeWrapperProps {
  children: ReactNode;
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => {
  return <div className="home-wrapper">{children}</div>;
};

export default HomeWrapper;
