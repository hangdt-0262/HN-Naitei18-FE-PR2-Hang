export const USER_ROLE = 0;
export const ADMIN_ROLE = 1;

export const DEFAULT_MENU_ITEMS = [
  {
    content: "Mua vé",
  },
  {
    content: "Phim",
    children: [
      {
        content: "Phim sắp chiếu",
        href: "/uncoming-movies",
      },
      {
        content: "Phim đang chiếu",
        href: "/playing-movies",
      },
    ],
  },
  {
    content: "Tin tức",
    href: "/news",
  },
  {
    content: "Rạp/Vé",
    href: "/cinemas-tickets",
  },
  {
    content: "Hỗ trợ",
    href: "/support",
  },
];

export const ADMIN_MENU_ITEMS = [
  { content: "Người dùng", href: "/users" },
  { content: "Phim", href: "/movies" },
  { content: "Doanh thu", href: "/revenue" },
  { content: "Vé", href: "/tickets" },
];
