import Image from "next/image";
import React from "react";

export default function Error() {
  return (
    <section className="flex flex-col items-center justify-center px-5 sm:px-10 py-10 font-mono gap-10 text-(--text)">
      <h3 className="text-center text-6xl md:text-8xl lg:text-9xl font-bold ">
        Error 404
      </h3>
      <div className="flex items-center justify-center gap-10 max-md:flex-col-reverse">
        <p className="text-4xl md:text-6xl lg:text-7xl max-w-[700px] max-md:text-center">
          Don’t worry my friend, not an alien penis... Flip the pickle.
        </p>
        <Image
          width={270}
          height={190}
          alt="image"
          src={"/svg/pikle-rick-vectorize 1.svg"}
          className="w-40 md:w-50 lg:w-60"
        />
      </div>
    </section>
  );
}
