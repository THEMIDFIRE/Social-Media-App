import { Logo } from "@/components/icons";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Globe, Home } from "lucide-react";

export default function NavbarComponent() {
    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
                <div className="w-10">
                    <Logo />
                </div>
                <h1 className="text-primary font-serif text-xl font-semibold">Reflect</h1>
            </div>
            <div className="grow">
                <ul className="flex justify-center items-center gap-4 [&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a]:p-2 [&>li>a]:text-secondary [&>li>.active]:text-primary [&>li>.active]:border-b-3 [&>li>.active]:border-primary">
                    <li>
                        <Link to="/feed" activeOptions={{ exact: true }}>
                            <Home />Feed
                        </Link>
                    </li>
                    <li>
                        <Link to="/feed/community" activeOptions={{ exact: true }}>
                            <Globe />Community
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar size="md" className="border border-gray-400">
                                {/* <Avatar.Image src="" alt="User's name"/> */}
                                <Avatar.Fallback>MM</Avatar.Fallback>
                            </Avatar>
                            <h4 className="font-semibold text-lg">Mohamed Magdy</h4>
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Popover className="border border-gray-400 shadow-xl">
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to="/profile">Profile</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/settings">Settings</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button variant="ghost" className="text-danger p-0">
                                    Logout
                                </Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
        </div>
    )
}
