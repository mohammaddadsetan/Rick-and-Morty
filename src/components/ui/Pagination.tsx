import React from "react";

interface PaginationProps {
  page_lenght: number;
  current_page: number;
}

export default function Pagination({
  page_lenght,
  current_page,
}: PaginationProps) {
  let startIndex = current_page == 1 ? 0 : current_page - 2;
  const Index_lenght = startIndex + 4;
  const active = "bg-primary-100 text-black";
  if (page_lenght - startIndex < 4) {
    startIndex = page_lenght - 4;
  }
  return (
    <div className="flex items-center gap-5 mb-10">
      {[...Array(page_lenght)]
        .slice(startIndex, Index_lenght)
        .map((_, index) => {
          const pageNumber = index + startIndex;
          return (
            <button
              key={pageNumber}
              className={`px-4 py-2 border-2 border-primary-100 rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150 cursor-pointer${
                current_page === startIndex + index + 1 ? ` ${active}` : ""
              }`}>
              {pageNumber + 1}
            </button>
          );
        })}

      {current_page + 3 < page_lenght && (
        <span className=" w-30 h-0 border-b-6 border-dotted"></span>
      )}

      {current_page + 2 < page_lenght && (
        <button className="px-4 py-2 border-2 border-primary-100 rounded-xl text-lg bg-black font-bold hover:bg-primary-100 hover:text-black transition-all duration-150 cursor-pointer">
          {page_lenght}
        </button>
      )}
    </div>
  );
}
