import type { Database } from "../types/database.types";

type ContactRow = Database["public"]["Tables"]["contacts"]["Row"];

export const mockContacts: ContactRow[] = [
  {
    id: "contact-01",
    full_name: "Nguyễn Văn An",
    email: "nguyenvanan@example.com",
    phone: "0901234567",
    company: "Công ty ABC",
    service_interested: "shoringConstruction",
    message:
      "Chúng tôi cần tư vấn về hệ giàn chống cho công trình tầng hầm B2 tại Quận 7.",
    is_read: false,
    is_replied: false,
    admin_note: null,
    created_at: "2024-01-15T08:30:00.000Z",
  },
  {
    id: "contact-02",
    full_name: "Trần Thị Bình",
    email: "tranthib@example.com",
    phone: "0912345678",
    company: "Tập đoàn XYZ",
    service_interested: "kingpostFabrication",
    message:
      "Dự án của chúng tôi cần 30 cây kingpost H350, xin báo giá và thời gian thi công.",
    is_read: true,
    is_replied: true,
    admin_note: "Đã gửi báo giá ngày 16/01/2024",
    created_at: "2024-01-14T14:00:00.000Z",
  },
  {
    id: "contact-03",
    full_name: "Lê Minh Cường",
    email: "leminhcuong@example.com",
    phone: null,
    company: null,
    service_interested: "larsenPile",
    message: "Cần ép cừ larsen cho công trình tường chắn đất tại Bình Dương.",
    is_read: false,
    is_replied: false,
    admin_note: null,
    created_at: "2024-01-13T10:15:00.000Z",
  },
];
