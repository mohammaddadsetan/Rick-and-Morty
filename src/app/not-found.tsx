import Image from "next/image";
import React from "react";

export default function Error() {
  return (
    <section className="flex flex-col items-center justify-center px-20 py-10 font-mono gap-10">
      <h3 className="text-center text-9xl">Error 404</h3>
      <div className="flex items-start justify-between gap-10">
        <p className="text-7xl max-w-[700px]">
          Don’t worry my friend, not an alien penis... Flip the pickle.
        </p>
        <Image
          width={270}
          height={190}
          alt="image"
          src={"/svg/pikle-rick-vectorize 1.svg"}
        />
      </div>
    </section>
  );
}
