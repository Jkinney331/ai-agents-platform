"use client";

import React from "react";
// import { cn } from "@/lib/utils";

type FeatureItem = {
  id: number;
  title: string;
  content: string;
};

type FeatureProps = {
  featureItems: FeatureItem[];
};

export const Feature = ({ featureItems }: FeatureProps) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-center w-full">
        <div className="grid h-full grid-cols-5 gap-x-10 px-10 md:px-20 items-center w-full">
          <div className="col-span-5 w-full h-full flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {featureItems.map((item) => (
                <div
                  key={item.id}
                  className=" rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-zinc-900 p-5 shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
