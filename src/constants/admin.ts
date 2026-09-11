import {
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  FileText,
  Users,
  LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: "emerald" | "amber" | "slate";
  };
  requiresRoleCheck?: boolean;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Staff Requests",
    href: "/admin/requests",
    icon: ClipboardList,
    badge: {
      text: "Live",
      variant: "emerald",
    },
  },
  {
    label: "Candidate Vetting",
    href: "/admin/applications",
    icon: UserCheck,
  },
  {
    label: "Blog CMS",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    label: "Team Users",
    href: "/admin/team",
    icon: Users,
    requiresRoleCheck: true,
  },
];

export interface RoleBadge {
  label: string;
  color: string;
  
}

export const ADMIN_ROLE_BADGES: Record<string, RoleBadge> = {
  SUPER_ADMIN: { label: "Super Admin", color: "bg-amber-100 text-amber-900 border-amber-300"},
  ADMIN: { label: "Admin", color: "bg-emerald-100 text-emerald-900 border-emerald-300"},
  SUPERVISOR_1: { label: "Supervisor 1", color: "bg-cyan-100 text-cyan-900 border-cyan-300" },
  SUPERVISOR_2: { label: "Supervisor 2", color: "bg-slate-200 text-slate-800 border-slate-300" },
};

export const DEFAULT_ROLE_BADGE: RoleBadge = {
  label: "Supervisor 2",
  color: "bg-slate-200 text-slate-800 border-slate-300",
};

export function getRoleBadge(role?: string): RoleBadge {
  if (!role) return DEFAULT_ROLE_BADGE;
  return ADMIN_ROLE_BADGES[role] || DEFAULT_ROLE_BADGE;
}

export function canManageTeam(role?: string): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}
