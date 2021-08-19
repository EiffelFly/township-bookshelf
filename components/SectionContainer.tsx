import * as React from "react";

interface Props { }

const SectionContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col m-auto max-w-4xl lg:max-w-[1200px] px-8 lg:px-4">
      {children}
    </div>
  );
};

export default SectionContainer;
