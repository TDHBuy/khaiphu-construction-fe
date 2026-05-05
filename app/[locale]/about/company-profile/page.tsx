import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/about/company-profile/HeroBanner";
import { WelcomeLetter } from "@/components/sections/about/company-profile/WelcomeLetter";
import { CompanyInfo } from "@/components/sections/about/company-profile/CompanyInfo";

export const metadata: Metadata = {
  title: "Hồ sơ công ty | Khải Phú Construction",
  description:
    "Khải Phú Construction — chuyên thi công Shoring, ép cừ Larsen, gia công Kingpost. Thành lập 2022, đối tác tin cậy của các tổng thầu lớn tại TP.HCM.",
  openGraph: {
    title: "Hồ sơ công ty | Khải Phú Construction",
    description:
      "Khải Phú Construction — chuyên thi công Shoring, ép cừ Larsen, gia công Kingpost.",
    type: "website",
  },
};

export default function CompanyProfilePage() {
  return (
    <>
      <HeroBanner />
      <WelcomeLetter />
      <CompanyInfo />
    </>
  );
}
