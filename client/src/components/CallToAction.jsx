import { Button } from "flowbite-react";
import React from "react";

function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-slate-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex flex-1 justify-center flex-col gap-3">
        <h2 className="font-semibold text-2xl">
          Want to learn more about ReactJs, NodeJs ?
        </h2>
        <p className="text-gray-500">
          Checkout these resourse with 100 ReactJS, NodeJs projects
        </p>
        <Button
          className="rounded-tl-xl rounded-bl-none"
          gradientDuoTone={"purpleToPink"}
        >
          <a
            href="https://github.com/iamhaao"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            100 Projects NodeJS, ReactJs
          </a>
        </Button>
      </div>
      <div className="p-7">
        <img className="w-80 h-60 " src="/images/image.png" alt="Javscrip" />
      </div>
    </div>
  );
}

export default CallToAction;
