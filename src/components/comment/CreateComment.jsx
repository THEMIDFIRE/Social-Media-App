import axios from 'axios'
import { Avatar, Button, TextInput } from 'flowbite-react'
import { PuffLoader } from "react-spinners";
import { Send } from 'iconsax-reactjs'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { userContext } from '../../context/userContext'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ServerAPI from '../shared/ServerAPI';

const schema = z.object({
    content: z.string().min(1)
})

export default function CreateComment({ postId }) {
    const { userData } = useContext(userContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onSuccess: (data) => {
            reset()
            toast.success(data?.message || 'Comment created successfully!')
            queryClient.invalidateQueries({ queryKey: ['allPosts'] })
            queryClient.invalidateQueries({ queryKey: ['SinglePost'] })
            queryClient.invalidateQueries({ queryKey: ['allComments'] })
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

    async function createComment({ content }) {
        const commentData = { content, post: postId }
        const { data } = await ServerAPI.post('/comments', commentData)
        return data
    }

    return (
        <form className="flex items-center gap-x-2" onSubmit={handleSubmit(mutate)}>
            <Avatar img={userData?.photo} />
            <TextInput
                className="grow"
                placeholder="What's your comment?"
                {...register('content')}
                maxLength={30}
                color={errors?.content ? 'failure' : 'gray'}
            />
            {isPending ?
                <div className='relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                    <PuffLoader size={30} color='#3b82f6' />
                </div> :
                <Button type='submit'>
                    <Send type='submit' className='cursor-pointer' />
                </Button>}
        </form>
    )
}