'use client'

export function CardSkeleton() {
  return (
    <article className="bento-card p-6 space-y-4">
      <div className="h-10 bg-neural-700 rounded-lg animate-neural-pulse" />
      <div className="h-4 bg-neural-700 rounded animate-neural-pulse w-3/4" />
      <div className="space-y-2">
        <div className="h-2 bg-neural-700 rounded-full animate-neural-pulse" />
        <div className="h-2 bg-neural-700 rounded-full animate-neural-pulse w-5/6" />
      </div>
    </article>
  )
}

export function HeroSkeleton() {
  return (
    <section className="bento-card col-span-1 md:col-span-2 p-8 space-y-6">
      <div className="h-12 bg-neural-700 rounded-lg animate-neural-pulse w-2/3" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-16 bg-neural-700 rounded-lg animate-neural-pulse" />
        <div className="h-16 bg-neural-700 rounded-lg animate-neural-pulse" />
      </div>
    </section>
  )
}

export function ActivitySkeleton() {
  return (
    <section className="bento-card col-span-1 md:col-span-2 p-6 space-y-4">
      <div className="h-6 bg-neural-700 rounded animate-neural-pulse w-1/3" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-neural-700 rounded animate-neural-pulse" />
        ))}
      </div>
    </section>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <HeroSkeleton />
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
      <ActivitySkeleton />
    </div>
  )
}