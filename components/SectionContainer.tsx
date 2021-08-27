import * as React from "react";

interface Props {
  className: string;
}

const SectionContainer: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={"flex flex-col mx-auto lg:max-w-[1200px] px-8 lg:px-4 py-16 " + className}>
      {children}
    </div>
  );
};

export default SectionContainer;
