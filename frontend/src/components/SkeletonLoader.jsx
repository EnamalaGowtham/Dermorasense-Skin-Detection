import React from 'react';

export const CardSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl w-full">
    <div className="shimmer h-6 w-1/3 rounded mb-4"></div>
    <div className="shimmer h-20 w-full rounded mb-4"></div>
    <div className="flex gap-2">
      <div className="shimmer h-8 w-20 rounded-full"></div>
      <div className="shimmer h-8 w-20 rounded-full"></div>
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl w-full min-h-[300px] flex flex-col justify-between">
    <div className="shimmer h-5 w-1/2 rounded"></div>
    <div className="h-[200px] flex items-end gap-2 px-4">
      <div className="shimmer w-full h-[30%] rounded-t"></div>
      <div className="shimmer w-full h-[60%] rounded-t"></div>
      <div className="shimmer w-full h-[45%] rounded-t"></div>
      <div className="shimmer w-full h-[85%] rounded-t"></div>
      <div className="shimmer w-full h-[20%] rounded-t"></div>
    </div>
    <div className="flex justify-between">
      <div className="shimmer h-3 w-10 rounded"></div>
      <div className="shimmer h-3 w-10 rounded"></div>
      <div className="shimmer h-3 w-10 rounded"></div>
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full glass-panel p-6 rounded-2xl">
    <div className="shimmer h-6 w-1/4 rounded mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
          <div className="shimmer h-4 w-1/5 rounded"></div>
          <div className="shimmer h-4 w-1/4 rounded"></div>
          <div className="shimmer h-6 w-16 rounded-full"></div>
          <div className="shimmer h-4 w-10 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

export const MapSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl w-full min-h-[350px] flex flex-col gap-4">
    <div className="shimmer h-5 w-1/3 rounded"></div>
    <div className="flex-1 shimmer rounded-xl min-h-[200px]"></div>
    <div className="flex gap-4">
      <div className="flex-1 shimmer h-10 rounded-lg"></div>
      <div className="w-24 shimmer h-10 rounded-lg"></div>
    </div>
  </div>
);
