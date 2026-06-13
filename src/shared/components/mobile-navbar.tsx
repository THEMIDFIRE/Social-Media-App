import { Button, Drawer } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Bookmark, Globe, Home, Menu, User } from "lucide-react";

export default function MobileNavbarComponent() {
    return (
        <Drawer>
            <Button variant='ghost'>
                <Menu />
            </Button>
            <Drawer.Backdrop variant='blur'>
                <Drawer.Content placement='right'>
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Body className="mt-4">
                            <nav>
                                <ul className="text-xl [&_*>a]:flex [&_*>a]:items-center [&_*>a]:gap-2 [&_*>a]:p-2 [&_*>a]:text-secondary [&_.active]:text-primary [&_.active]:font-semibold">
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
                            </nav>
                        </Drawer.Body>
                        <Drawer.Footer className="flex-col items-start">
                            <nav>
                                <ul className="text-xl [&_*>a]:flex [&_*>a]:items-center [&_*>a]:gap-2 [&_*>a]:p-2 [&_*>a]:text-secondary [&_.active]:text-primary [&_.active]:font-semibold">
                                    <li>
                                        <Link to="/profile" activeOptions={{ exact: true }}>
                                            <User />Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feed/saved" activeOptions={{ exact: true }}>
                                            <Bookmark />Saved
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <Button fullWidth variant="ghost" className="text-danger p-0">
                                Logout
                            </Button>
                        </Drawer.Footer>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    )
}
