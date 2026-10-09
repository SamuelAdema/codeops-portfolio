"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

// Hook placed directly in this file to maintain your exact structure
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  const key = debouncedTerm
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}`
    : "/api/dishes";

  const { data, error, isLoading } = useSWR(key, fetcher, {
    keepPreviousData: true,
  });

  return (
    <section>
      <div className="mb-6">
        <label htmlFor="search" className="mb-2 block font-medium">Search dishes</label>
        <input
          id="search"
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search for tibs, kitfo..."
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {error && <p className="text-red-600">Could not load dishes.</p>}
      {!error && isLoading && !data && <p>Loading dishes...</p>}

      {data && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((dish) => (
            <article key={dish.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{dish.name}</h2>
              <p className="mt-2 text-gray-600">{dish.description}</p>
              <p className="mt-4 font-bold">{dish.price} ETB</p>
            </article>
          ))}
        </div>
      )}

      {data?.length === 0 && <p className="text-gray-600">No dishes found.</p>}
    </section>
  );
}