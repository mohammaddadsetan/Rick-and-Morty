"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  page_lenght: number;
  current_page: number;
}

export default function Pagination({
  page_lenght,
  current_page,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  const startIndex = current_page === 1 ? 0 : current_page - 2;
  const Index_lenght = startIndex + 4;

  const active = "!bg-primary-100 !text-black";
  const disabledClass = "opacity-30 pointer-events-none";

  return (
    <div className="flex flex-col items-center justify-center mb-10 gap-5">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <Link
          href={createHref(current_page - 1)}
          aria-disabled={current_page === 1}
          className={`hidden md:block ${
            current_page === 1 ? disabledClass : ""
          }`}>
          <ChevronLeft size={70} className="text-primary-100" />
        </Link>

        {current_page > 2 && (
          <Link
            href={createHref(1)}
            className="size-8 sm:size-10 md:size-12 flex items-center justify-center border-2 border-primary-100 rounded-lg md:rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150">
            1
          </Link>
        )}

        {current_page > 3 && (
          <span className="w-3 sm:w-6 h-0 border-b-6 border-dotted border-(--text)"></span>
        )}

        {[...Array(page_lenght)]
          .slice(startIndex, Index_lenght)
          .map((_, index) => {
            const pageNumber = page_lenght === 1 ? 1 : startIndex + index + 1;

            return (
              <Link
                key={pageNumber}
                href={createHref(pageNumber)}
                className={`size-9 sm:size-10 md:size-12 flex items-center justify-center border-2 border-primary-100 rounded-lg md:rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150 ${
                  current_page === pageNumber ? active : ""
                }`}>
                {pageNumber}
              </Link>
            );
          })}

        {current_page < page_lenght - 3 && (
          <span className="w-3 sm:w-6 h-0 border-b-6 border-dotted border-(--text)"></span>
        )}

        {current_page < page_lenght - 2 && (
          <Link
            href={createHref(page_lenght)}
            className="size-8 sm:size-10 md:size-12 flex items-center justify-center border-2 border-primary-100 rounded-lg md:rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150">
            {page_lenght}
          </Link>
        )}

        <Link
          href={createHref(current_page + 1)}
          aria-disabled={current_page === page_lenght}
          className={`hidden md:block ${
            current_page === page_lenght ? disabledClass : ""
          }`}>
          <ChevronRight size={70} className="text-primary-100" />
        </Link>
      </div>

      <div className="flex gap-10 md:hidden">
        <Link
          href={createHref(current_page - 1)}
          aria-disabled={current_page === 1}
          className={`${current_page === 1 ? disabledClass : ""}`}>
          <ChevronLeft size={70} className="text-primary-100" />
        </Link>

        <Link
          href={createHref(current_page + 1)}
          aria-disabled={current_page === page_lenght}
          className={`${current_page === page_lenght ? disabledClass : ""}`}>
          <ChevronRight size={70} className="text-primary-100" />
        </Link>
      </div>
    </div>
  );
}
