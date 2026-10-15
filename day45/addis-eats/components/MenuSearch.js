"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useDebounce } from "@/app/menu/useDebounce";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function MenuSearch() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  // Step 7: Null key when empty search, 300ms debounce, keepPreviousData
  const { data: searchResults, isLoading: isSearchLoading } = useSWR(
    debouncedSearch
      ? `/api/dishes?q=${encodeURIComponent(debouncedSearch)}`
      : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  // Step 9: Pagination key changes with page number
  const { data: paginatedData, isLoading: isPageLoading } = useSWR(
    !debouncedSearch ? `/api/dishes?page=${page}` : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return (
    <section className="my-8 space-y-6 rounded-xl border border-stone-200 bg-stone-50 p-6">
      <div>
        <label htmlFor="dish-search" className="block text-sm font-medium text-stone-700 mb-2">
          Interactive Search & Paginated Explorer (SWR)
        </label>
        <input
          id="dish-search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search dishes (e.g., kitfo, doro, vegan)..."
          className="w-full rounded-md border border-stone-300 bg-white px-4 py-2 text-sm focus:border-amber-600 focus:outline-none"
        />
      </div>

      {debouncedSearch ? (
        <div className="space-y-3">
          {isSearchLoading && (
            <p className="text-sm text-amber-700">Searching...</p>
          )}
          {searchResults?.length === 0 ? (
            <p className="text-sm text-stone-500">
              No dishes matched &ldquo;{debouncedSearch}&rdquo;.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {searchResults?.map((dish) => (
                <article
                  key={dish.id}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-stone-900">{dish.name}</h3>
                  <p className="text-sm text-amber-700 font-medium">
                    {dish.price} ETB
                  </p>
                  <Link
                    href={`/menu/${dish.id}`}
                    className="mt-2 inline-block text-xs text-amber-600 hover:underline"
                  >
                    View dish details →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Paginated Browse (Page {page} of {paginatedData?.totalPages || 1})
            </span>
            {isPageLoading && (
              <span className="text-xs text-amber-600">Loading page...</span>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {paginatedData?.dishes?.map((dish) => (
              <article
                key={dish.id}
                className="rounded-lg border bg-white p-3 shadow-sm"
              >
                <h3 className="font-medium text-stone-900">{dish.name}</h3>
                <p className="text-xs text-stone-600">{dish.price} ETB</p>
                <Link
                  href={`/menu/${dish.id}`}
                  className="mt-1 inline-block text-xs text-amber-600 hover:underline"
                >
                  Details →
                </Link>
              </article>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded border bg-white px-3 py-1 text-xs font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPage((p) =>
                  paginatedData && p < paginatedData.totalPages ? p + 1 : p
                )
              }
              disabled={
                !paginatedData || page >= (paginatedData?.totalPages || 1)
              }
              className="rounded border bg-white px-3 py-1 text-xs font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}