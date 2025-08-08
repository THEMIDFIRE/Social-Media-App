import { Avatar, Card, FooterDivider, TextInput } from "flowbite-react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Image } from "iconsax-reactjs";
import CreatePost from "../../components/Posts/CreatePost";
import AllPosts from "../../components/Posts/AllPosts";

export default function Home() {
    const { userData } = useContext(userContext)

    return (
        <>
            <CreatePost/>
            <AllPosts/>
        </>
    )
}
