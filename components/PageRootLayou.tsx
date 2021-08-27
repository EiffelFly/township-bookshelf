import * as React from "react";

interface Props {}

export const PageRootLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="flex w-screen min-h-screen bg-sdm-cg-900"
    >
      {children}
    </div>
  )
}