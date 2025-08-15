import axios from "axios";
import { Avatar, Button, Card, CloseIcon, FileInput, FooterDivider, TextInput } from "flowbite-react";
import { Image } from "iconsax-reactjs";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../context/userContext";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    body: z.string().optional(),
    image: z.any().optional()
})

export default function CreatePost() {
    const [previewImg, setPreviewImg] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)
    const [isValidErrMsg, setIsValidErrMsg] = useState('')
    const { userData } = useContext(userContext)
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({ 
        resolver: zodResolver(schema) 
    })
    const uploadImg = useRef()

    const bodyValue = watch('body')

    async function createPost(values) {
        const hasTxt = values.body?.trim();
        const hasImg = selectedImg;

        if (!hasTxt && !hasImg) {
            setIsValidErrMsg('Please add some content or image to your post')
            return;
        }

        setIsValidErrMsg('');

        const formData = new FormData();
        if (hasTxt) {
            formData.append('body', values.body.trim())
        }
        if (hasImg) {
            formData.append('image', selectedImg)
        }
        console.log('values', values)
        console.log('selectedImg', selectedImg)

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, formData, {
                headers: { 
                    token: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log('success', data);
            reset()
            setPreviewImg(null)
            setSelectedImg(null)
            setIsValidErrMsg('')
            if (uploadImg.current) {
                uploadImg.current.value = ''
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    function handleImg(e) {
        const img = e.target.files[0];
        if (img) {
            setPreviewImg(URL.createObjectURL(img));
            setSelectedImg(img)
            setIsValidErrMsg('')
        }
    }

    function rmvImg() {
        setPreviewImg(null)
        setSelectedImg(null)
        if (uploadImg.current) {
            uploadImg.current.value = ''
        }
        if (!bodyValue?.trim()) {
            setIsValidErrMsg('Please add some content or image to your post')
        }
    }

    return (
        <Card className="mb-3">
            <form onSubmit={handleSubmit(createPost)}>
                <h2 className="font-bold">Make a post</h2>
                <FooterDivider className="my-4 lg:my-4" />
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput
                        className="grow"
                        placeholder="What are you thinking?"
                        {...register('body')}
                        color={(errors?.body || (isValidErrMsg && !selectedImg)) ? 'failure' : 'gray'}
                        onChange={(e) => {
                            if (e.target.value.trim() || selectedImg) {
                                setIsValidErrMsg('')
                            }
                        }}
                    />
                    <FileInput
                        accept="image/*"
                        className="hidden"
                        ref={uploadImg}
                        onChange={handleImg}
                    />
                    <Image onClick={() => uploadImg.current?.click()} className="cursor-pointer"/>
                </div>
                {previewImg && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <div className="relative">
                            <img src={previewImg} alt={`Preview of ${selectedImg?.name}`} className="max-h-60 object-cover rounded" />
                            <CloseIcon 
                                onClick={rmvImg} 
                                className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            />
                        </div>
                    </div>
                )}
                <Button type="submit" className="bg-blue-800/90 w-full mt-4">Create Post</Button>
            </form>
        </Card>
    )
}