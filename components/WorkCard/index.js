'use client';
import React from "react";
import Comparator from "../comparator";

const WorkCard = ({ img, name, description, useComparator, beforeSrc, afterSrc }) => {
  return (
    <div className="overflow-visible rounded-lg p-2 laptop:p-4 first:ml-0">
      <div className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-[1500px]"     >
        {useComparator && beforeSrc && afterSrc ? (
          <Comparator beforeSrc={beforeSrc} afterSrc={afterSrc} />
        ) : (
          <img
            alt={name}
            className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
            src={img}
          ></img>
        )}
      </div>
      <h2 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h2>
      <h3 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h3>
    </div>
  );
};

export default WorkCard;
