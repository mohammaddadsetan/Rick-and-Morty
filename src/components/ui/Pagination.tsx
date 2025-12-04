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
    if (page == 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    return `${pathname}?${params.toString()}`;
  };
  const startIndex = current_page == 1 ? 0 : current_page - 2;
  const Index_lenght = startIndex + 4;
  const active = "bg-primary-100 text-black";

  return (
    <div className="flex items-center gap-5 mb-10">
      {current_page !== 1 && (
        <Link href={createHref(current_page - 1)}>
          <ChevronLeft size={70} className="text-primary-100" />
        </Link>
      )}
      {current_page > 2 && (
        <Link
          href={createHref(1)}
          className="px-4 py-2 border-2 border-primary-100 rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150 cursor-pointer">
          {1}
        </Link>
      )}
      {current_page > 3 && (
        <span className=" w-30 h-0 border-b-6 border-dotted"></span>
      )}
      {[...Array(page_lenght)]
        .slice(startIndex, Index_lenght)
        .map((_, index) => {
          const pageNumber = page_lenght == 1 ? 1 : startIndex + index + 1;
          return (
            <Link
              key={pageNumber}
              href={createHref(pageNumber)}
              className={`px-4 py-2 border-2 border-primary-100 rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150 cursor-pointer${
                current_page === pageNumber ? ` ${active}` : ""
              }`}>
              {pageNumber}
            </Link>
          );
        })}

      {current_page < page_lenght - 3 && (
        <span className=" w-30 h-0 border-b-6 border-dotted"></span>
      )}

      {current_page < page_lenght - 2 && (
        <Link
          href={createHref(page_lenght)}
          className="px-4 py-2 border-2 border-primary-100 rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150 cursor-pointer">
          {page_lenght}
        </Link>
      )}
      {current_page !== page_lenght && (
        <Link href={createHref(current_page + 1)}>
          <ChevronRight size={70} className="text-primary-100" />
        </Link>
      )}
    </div>
  );
}
