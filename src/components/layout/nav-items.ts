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
    href: "/dashboard/profile",
    label: "Edit Profile",
    icon: User,
  },
  {
    href: "/dashboard/directory",
    label: "Directory",
    icon: BookUser,
  },
  {
    href: "/dashboard/memories",
    label: "Memories",
    icon: Images,
  },
  {
    href: "/dashboard/announcements",
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
    label: "Classmates Profile",
    icon: Users,
  },
  {
    href: "/admin/classmates",
    label: "Classmates Whitelist",
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
