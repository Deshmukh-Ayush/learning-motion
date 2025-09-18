import React from "react";
import { Heading, SubHeading } from "../ui/text";

export const ScrollTriggerDemo = () => {
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-neutral-300">
        <div className="flex flex-col">
          <Heading>Cloff</Heading>
          <SubHeading>
            Digital Studio focused on building great products.
          </SubHeading>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center bg-neutral-600">
        <div className="flex flex-col">
          <Heading>Suppose cloff is written multiple times</Heading>
          <SubHeading>
            Digital Studio focused on building great products.
          </SubHeading>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center bg-neutral-800">
        <div className="flex flex-col">
          <Heading>Cloff</Heading>
          <SubHeading>
            Digital Studio focused on building great products.
          </SubHeading>
        </div>
      </div>
    </div>
  );
};
