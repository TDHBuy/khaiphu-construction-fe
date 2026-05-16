"use client";

import PartnerCard from "./PartnerCard";

type Props = {
  partners: string[];
  variant: "general" | "main";
};

const gridClass = {
  general: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
  main: "grid grid-cols-2 lg:grid-cols-3 gap-4",
} as const;

export default function PartnerGrid({ partners, variant }: Props) {
  return (
    <div className={gridClass[variant]}>
      {partners.map((name, i) => (
        <PartnerCard key={name} name={name} index={i} />
      ))}
    </div>
  );
}
