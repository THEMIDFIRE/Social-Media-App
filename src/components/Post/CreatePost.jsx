import axios from "axios";
import { Avatar, Button, Card, CloseIcon, FileInput, FooterDivider, TextInput } from "flowbite-react";
import { Image } from "iconsax-reactjs";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../context/userContext";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import ServerAPI from "../shared/ServerAPI";

const schema = z.object({
    body: z.string().optional(),
    image: z.any().optional()
}).refine((data) => {
    const hasText = data.body && data.body.trim().length > 0;
    const hasImage = data.image && data.image.length > 0;
    return hasText || hasImage;
}, {
    message:  '',
    path: ["body"]
});

export default function CreatePost() {
    const [previewImg, setPreviewImg] = useState(null)
    const { userData } = useContext(userContext)
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm({
        resolver: zodResolver(schema)
    })
    const uploadImg = useRef()

    const bodyValue = watch('body')
    const imageFiles = watch('image')

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            reset()
            setPreviewImg(null)
            toast.success(data?.message)
            if (uploadImg.current) {
                uploadImg.current.value = ''
            }
            queryClient.invalidateQueries({ queryKey: ['allPosts'] })
        },
        onError: (error) => {
            if (error.response) {
                toast.error(error.response.data.message || 'Something went wrong');
            } else if (error.request) {
                toast.error('Network error - please try again');
            } else {
                toast.error(error.message || 'An error occurred');
            }
        }
    })

    async function createPost(values) {
        const formData = new FormData();
        
        if (values.body && values.body.trim()) {
            formData.append('body', values.body.trim())
        }
        if (values.image && values.image.length > 0) {
            formData.append('image', values.image[0])
        }

        const { data } = await ServerAPI.post('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
    }

    function handleImageChange(e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setValue('image', files);
            setPreviewImg(URL.createObjectURL(file));
        }
    }

    function rmvImg() {
        if (previewImg) {
            URL.revokeObjectURL(previewImg);
        }

        setPreviewImg(null)
        setValue('image', null)
        if (uploadImg.current) {
            uploadImg.current.value = ''
        }
    }

    return (
        <Card className="mb-3">
            <form onSubmit={handleSubmit(mutate)}>
                <h2 className="font-bold">Make a post</h2>
                <FooterDivider className="my-4 lg:my-4" />
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput
                        className='grow'
                        placeholder="What are you thinking?"
                        {...register('body')}
                        color={errors?.body ? 'failure' : 'gray'}
                    />
                    <FileInput
                        {...register('image')}
                        accept="image/*"
                        className="hidden"
                        ref={uploadImg}
                        onChange={handleImageChange}
                    />
                    <Image onClick={() => uploadImg.current?.click()} className="cursor-pointer" />
                </div>
                {previewImg && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <div className="relative">
                            <img
                                src={previewImg}
                                alt="Preview"
                                className="max-h-60 object-cover rounded"
                            />
                            <CloseIcon
                                onClick={rmvImg}
                                className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            />
                        </div>
                    </div>
                )}

                {isPending ?
                    <div className="flex justify-center mt-4">
                        <PuffLoader size={30} color="#3b82f6" />
                    </div> :
                    <Button type="submit" className="bg-blue-800/90 w-full mt-4 cursor-pointer">Create Post</Button>}
            </form>
        </Card>
    )
}