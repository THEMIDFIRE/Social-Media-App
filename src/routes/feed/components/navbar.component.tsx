import { Logo } from "@/components/icons";
import { Avatar } from "@heroui/react";
import { Globe, Home } from "lucide-react";

export default function NavbarComponent() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-10">
                    <Logo />
                </div>
                <h1 className="text-primary font-serif text-xl font-semibold">Reflect</h1>
            </div>
            <div className="grow">
                <ul className="flex justify-center items-center gap-4">
                    <li>
                        <Home />
                    </li>
                    <li>
                        <Globe />
                    </li>
                    <li></li>
                </ul>
            </div>
            <div>
                <Avatar size="md" className="border border-gray-400">
                    {/* <Avatar.Image src="" alt="User's name"/> */}
                    <Avatar.Fallback>MM</Avatar.Fallback>
                </Avatar>
            </div>
        </div>
    )
}
