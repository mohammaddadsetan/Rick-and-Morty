import React from "react";

export default function Loading() {
  return (
    <div className="bg-[#272727] my-10 sm:mx-10 mx-5 w-full animate-pulse max-w-[1000px] rounded-4xl p-5 sm:p-10 flex gap-5 sm:gap-10 relative  max-lg:flex-col max-lg:justify-center max-lg:items-center">
      <div className="border-2 border-white rounded-3xl overflow-hidden w-full max-lg:h-[400px] max-w-[400px] max-sm:h-[300px]"></div>

      <div className="flex flex-col gap-10  w-full lg:w-2/3  justify-between md:flex-row lg:flex-col ">
        <div className="flex flex-col gap-5 bg-[#4d4d4d] rounded-3xl p-5 md:p-10 border-2 border-white max-lg:w-full h-full">
          <div className="w-full h-2 bg-gray-200 rounded-4xl animate-wave delay-300"></div>
          <hr className="w-1/2" />
          <div className="flex flex-col gap-4 w-full z-10">
            <div className="w-2/4 h-2 bg-gray-500 rounded-4xl animate-wave"></div>
            <div className="w-1/4 h-2 bg-gray-400 rounded-4xl animate-wave delay-100"></div>
            <div className="w-3/4 h-2 bg-gray-300 rounded-4xl animate-wave delay-200"></div>
            <div className="w-full h-2 bg-gray-200 rounded-4xl animate-wave delay-300"></div>
          </div>
        </div>

        <div className="flex gap-2 bg-[#4d4d4d] rounded-3xl p-4 justify-evenly lg:h-20 md:flex-col lg:flex-row"></div>
      </div>
    </div>
  );
}
