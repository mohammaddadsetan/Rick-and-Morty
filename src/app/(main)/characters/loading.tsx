import Image from "next/image";

export default function Loading() {
  return (
    <section className="flex flex-wrap justify-center items-center w-auto mx-auto my-10 gap-10">
      {Array(8)
        .fill(0)
        .map((_, key) => (
          <div
            key={key}
            className="bg-gray-700 w-72 h-96 rounded-3xl items-center justify-between flex flex-col p-5 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full animate-shimmer" />
            </div>

            <div className="size-50 relative z-10">
              <Image
                alt="image"
                src={"/svg/rick&morty_black.svg"}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-4 w-full z-10">
              <div className="w-2/4 h-2 bg-gray-500 rounded-4xl animate-wave"></div>
              <div className="w-1/4 h-2 bg-gray-400 rounded-4xl animate-wave delay-100"></div>
              <div className="w-3/4 h-2 bg-gray-300 rounded-4xl animate-wave delay-200"></div>
              <div className="w-full h-2 bg-gray-200 rounded-4xl animate-wave delay-300"></div>
            </div>
          </div>
        ))}
    </section>
  );
}
