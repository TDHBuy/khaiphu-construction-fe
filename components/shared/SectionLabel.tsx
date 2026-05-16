type SectionLabelProps = {
  label: string;
  labelEn: string;
};

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="block w-8 h-[2px] bg-[#FFCB05] flex-shrink-0" />
      <span className="text-[#f8c80b] text-xs font-semibold tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}
