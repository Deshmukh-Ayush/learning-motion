import React from "react";

const links = [
  {
    id: 1,
    name: "Commit",
  },
  {
    id: 2,
    name: "Analytics",
  },
  {
    id: 3,
    name: "Upgrade",
  },
];

export const ActionToolbar = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <div>commit</div>
      </div>
      <div className="flex items-center justify-center gap-4">
        {links.map((link) => (
          <button className="flex cursor-pointer items-center justify-center rounded-md border-[1px] border-gray-200 px-1 py-1 text-sm">
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
};
