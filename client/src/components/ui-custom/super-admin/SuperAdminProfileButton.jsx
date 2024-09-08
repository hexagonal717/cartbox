import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui-custom/super-admin/dropdown-menu.jsx';
import { Button } from '@/components/ui-custom/super-admin/button.jsx';
import { ChevronDown, CircleUser, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';

const SuperAdminProfileButton = ({ userData, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`border border-blue-600/40 bg-blue-600/10 hover:bg-blue-600/15 dark:border-blue-500/40
            dark:bg-blue-500/10 dark:hover:bg-blue-500/15`}
          variant="outline">
          <div className={'text-blue-600 dark:text-blue-500'}>
            {`${userData?.firstName}` || 'User'}
          </div>
          <Avatar className={'flex items-center justify-center'}>
            <AvatarImage
              className={'h-6 w-6 rounded-full object-cover'}
              src={userData?.image}
            />
            <AvatarFallback>
              <CircleUser />
            </AvatarFallback>
          </Avatar>
          <ChevronDown className={'scale-75 text-blue-600 dark:text-blue-500'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'w-40'}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>

            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <LogOut onClick={handleLogout} className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SuperAdminProfileButton;
