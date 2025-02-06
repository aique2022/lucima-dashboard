"use client";
import {
  CloudDownloadIcon,
  HandCoinsIcon,
  HandshakeIcon,
  LayoutDashboard,
  Package,
  TicketCheckIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navLinks = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/tickets",
    icon: TicketCheckIcon,
    label: "Tickets",
  },
  {
    href: "/user-management/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/user-management/roles",
    icon: CloudDownloadIcon,
    label: "Reports",
  },

  {
    href: "/user-management/roles",
    icon: HandCoinsIcon,
    label: "Roles",
  },
  {
    href: "/user-management/departments",
    icon: HandshakeIcon,
    label: "Departments",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-60 bg-white border-r z-50 hidden md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-14 justify-center items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <p className="font-bold text-2xl text-slate-600">
              Sync
              <span className="text-orange-400">Hub</span>
            </p>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto pt-3">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive
                      ? "bg-muted text-white bg-orange-600"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {/* {link.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {link.badge}
                    </Badge>
                  )} */}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
