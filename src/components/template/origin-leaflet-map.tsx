'use client';

interface OriginMapProps {
  slug: string;
  name: string;
  region: string;
}

export function OriginLeafletMap({ slug, name, region }: OriginMapProps) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg" style={{ height: 350 }}>
      <img
        src={`/images/origin-maps/${slug}.png`}
        alt={`${name} — ${region}`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
