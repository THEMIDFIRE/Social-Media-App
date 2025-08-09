import { Avatar, Button, Card, FooterDivider, TextInput } from "flowbite-react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Image } from "iconsax-reactjs";

export default function CreatePost() {

    const { userData } = useContext(userContext)

    return (
        <Card className="mb-3">
            <h2 className="font-bold">Make a post</h2>
            <FooterDivider className="my-1 lg:my-1" />
            <div className="flex items-center gap-x-2">
                <Avatar img={userData?.photo} />
                <TextInput className="grow"placeholder="What are you thinking?"/>
                <Image/>
            </div>
            <Button type="submit" className="bg-blue-800/90">create post</Button>
        </Card>
    )
}
