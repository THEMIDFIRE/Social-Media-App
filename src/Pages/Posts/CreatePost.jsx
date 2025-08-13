import { Avatar, Button, Card, FileInput, FooterDivider, TextInput } from "flowbite-react";
import { useContext, useRef, useState } from "react";
import { userContext } from "../../context/userContext";
import { Image } from "iconsax-reactjs";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreatePost() {
    const [previewImg, setPreviewImg] = useState()
    const { userData } = useContext(userContext)
    const { register, handleSubmit } = useForm()
    const uploadImg = useRef()
    const imgPath = uploadImg.current


    async function createPost(values) {
        const formData = new FormData()
        formData.append('body', values.body)
        formData.append('image', imgPath.files[0])
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/posts`, {
                method: 'POST',
                headers: { token: localStorage.getItem('token') },
                data: formData
            })
        } catch (error) {
            console.log('error', error)

        }
    }

    function handleImg(e) {
        const img = e.target.files[0];
        if (img) {
            setPreviewImg(URL.createObjectURL(img));
        }
    }

    return (
        <Card className="mb-3">
            <form onSubmit={handleSubmit(createPost)}>
                <h2 className="font-bold">Make a post</h2>
                <FooterDivider className="my-4 lg:my-4" />
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput className="grow" placeholder="What are you thinking?" {...register('body')} />
                    <FileInput className="hidden" {...register('image')} ref={uploadImg} onChange={handleImg} multiple />
                    <Image onClick={() => imgPath.click()} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {previewImg &&
                        (<img src={previewImg} alt={`Preview of ${imgPath?.files?.name}`} className="max-h-60 object-cover" />)}
                </div>
                <Button type="submit" className="bg-blue-800/90 w-full mt-4">create post</Button>
            </form>
        </Card>
    )
}
