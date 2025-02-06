import Link from "next/link";
import { ModeToggle } from "./toggle";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-green-600 md:bg-background lg:bg-background px-4 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center justify-center">
          <SidebarTrigger className="-ml-2 bg-white me-2 dark:bg-black" />
          <Link href="/dashboard">
            <span className="text-bold text-white text-xl sm:hidden">
              Dashboard
            </span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
