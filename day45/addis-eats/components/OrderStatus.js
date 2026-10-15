"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function OrderStatus({ orderId, initialOrder }) {
  const { data } = useSWR(`/api/orders/${orderId}/status`, fetcher, {
    refreshInterval: 5000,
    fallbackData: initialOrder,
  });

  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-amber-900">Order Status</h2>
        <span className="text-xs text-amber-700">
          Auto-updates every 5 seconds
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold text-amber-800">{data?.status}</p>
    </section>
  );
}