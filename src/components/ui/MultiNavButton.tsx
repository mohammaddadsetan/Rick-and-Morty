"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type MultiNavLinkProps = {
  children?: React.ReactNode | string;
  linkClassName?: string;
  containerClassName?: string;
  data: Array<{ href: string; text: string }>;
  activeClassName?: string;
};

export default function MultiNavButton({
  containerClassName,
  linkClassName,
  data,
  activeClassName,
  children,
}: MultiNavLinkProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center ${
        containerClassName ? containerClassName : "gap-10 text-neutral"
      }`}>
      {data.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={index}
            href={item.href}
            className={`
              relative px-4 py-2 rounded-lg transition-all duration-300
              ${linkClassName ?? ""}
              ${isActive ? activeClassName ?? "" : ""}
            `}>
            {isActive && (
              <span className="absolute inset-0 z-0 overflow-hidden   rounded-lg ">
                <span className="absolute  animate-border-spin   inset-[-1000%]  bg-[conic-gradient(from_0deg,transparent_0deg_80%,#ffffff_90%,transparent_100%)]" />

                <span className="absolute inset-[2px]  bg-black rounded-[5px] z-10"></span>
              </span>
            )}

            <span className="relative z-20">{item.text}</span>

            {children}
          </Link>
        );
      })}
    </div>
  );
}
