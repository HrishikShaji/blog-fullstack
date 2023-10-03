"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  hasPrev,
  hasNext,
}) => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between">
      <button
        className="bg-neutral-600 disabled:bg-neutral-300 px-3 py-2 cursor-pointer"
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrev}
      >
        PREV
      </button>
      <button
        className="bg-neutral-600 px-3 py-2 cursor-pointer disabled:bg-neutral-300"
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        NEXT
      </button>
    </div>
  );
};
