import {
  LayoutDashboard,
  User,
  BookUser,
  Images,
  Megaphone,
  Shield,
  Users,
  Settings,
} from "lucide-react";

export const mainNav = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/directory",
    label: "Directory",
    icon: BookUser,
  },
  {
    href: "/memories",
    label: "Memories",
    icon: Images,
  },
  {
    href: "/announcements",
    label: "Announcements",
    icon: Megaphone,
  },
];

export const adminNav = [
  {
    href: "/admin",
    label: "Overview",
    icon: Shield,
  },
  {
    href: "/admin/profiles",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/classmates",
    label: "Classmates",
    icon: Users,
  },
  {
    href: "/admin/announcements",
    label: "Announcements",
    icon: Megaphone,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];
