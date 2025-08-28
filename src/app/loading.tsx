"use client";
import LoadingSkeleton from '@/components/loading-skeleton';

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton />;
}