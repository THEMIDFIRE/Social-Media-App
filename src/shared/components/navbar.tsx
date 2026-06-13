import { Avatar, Button, Dropdown } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Globe, Home } from "lucide-react";

export default function NavbarComponent() {
    return (
        <>
            <div className="grow">
                <ul className="flex justify-center items-center gap-4 [&_*>a]:flex [&_*>a]:items-center [&_*>a]:gap-2 [&_*>a]:p-2 [&_*>a]:text-secondary [&_.active]:text-primary [&_.active]:border-b-3 [&_.active]:border-primary [&_.active]:font-semibold">
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
                    <Dropdown.Popover className="border border-gray-400 shadow-xl [&_.active]:font-bold">
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to="/profile" activeOptions={{ exact: true }}>Profile</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/settings" activeOptions={{ exact: true }}>Settings</Link>
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
        </>
    )
}
