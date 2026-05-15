type SectionLabelProps = {
  label: string;
  labelEn: string;
};

export default function SectionLabel({ label, labelEn }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="block w-8 h-[2px] bg-[#FFCB05] flex-shrink-0" />
      <span className="text-[#FFCB05] text-xs font-semibold tracking-[0.2em] uppercase">
        {label} · {labelEn}
      </span>
    </div>
  );
}
