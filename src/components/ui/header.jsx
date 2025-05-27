import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./button";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);

  return (
    <nav className="flex justify-between items-center p-4 border-b-1">
      <div className="flex items-center space-x-6">
        <Link to="/">
          <p className="text-lg font-medium">
            <span className="text-blue-500">URL</span> shortner
          </p>
        </Link>
        {user && (
          <Link 
            to="/url-dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            URL Dahboard
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {!user ? (
          <Button
            className="cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border-none">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <LogOut className="size-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
