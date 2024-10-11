import { Button } from '@repo/ui/components/ui/button';
import { Separator } from '@repo/ui/components/ui/separator';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { MenuLink } from './menu-link';
import { Search } from './search';
// import { ThemeSwitcher } from './theme-switcher';
// import { UserProfileButton } from './user-profile-button';

export function Header() {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center space-x-4">
          <h1 className="select-none text-lg font-bold">Ravo</h1>
          <Separator orientation="vertical" className="h-6" />
          <nav className="flex items-center space-x-2 lg:space-x-3">
            <MenuLink href="/">Dashboard</MenuLink>
            <MenuLink href="/uploads">Uploads</MenuLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Search />

          <Separator orientation="vertical" className="h-6" />

          <Button size="sm" asChild>
            <Link href="/upload">
              <PlusCircle className="mr-2 size-4" />
              Novo
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-6" />
          {/*
          <ThemeSwitcher />
          <UserProfileButton /> */}
        </div>
      </div>
    </div>
  );
}
