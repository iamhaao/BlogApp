import React from "react";

function Project() {
  return (
    <div className="grid  grid-rows-[1fr,2fr]">
      <div className="grid bg-green-400 grid-cols-[2fr,1fr]">
        <div className="">1</div>
        <div>1</div>
        <div className="grid  grid-rows-[2fr,1fr]">
          <div>123</div>
          <div>456</div>
        </div>
        <div>1</div>
        <div>1</div>
      </div>
      <div className="bg-blue-400">2</div>
    </div>
  );
}

export default Project;
