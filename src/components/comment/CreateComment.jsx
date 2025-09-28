import { Avatar, Button, TextInput } from 'flowbite-react';
import { Send } from 'iconsax-reactjs';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PuffLoader } from "react-spinners";
import { userContext } from '../../context/userContext';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as z from 'zod';
import ServerAPI from '../shared/ServerAPI';

const schema = z.object({
    content: z.string().min(2, 'Comment must be at least 2 characters long').max(30)
})

export default function CreateComment({ postId }) {
    const { userData } = useContext(userContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onSuccess: (data) => {
            reset()
            toast.success('Comment created successfully!')
            queryClient.invalidateQueries({ queryKey: ['allPosts'] })
            queryClient.invalidateQueries({ queryKey: ['SinglePost'] })
            queryClient.invalidateQueries({ queryKey: ['allComments'] })
        },
        onError: (error) => {
            if (error.response) {
                toast.error(error?.response?.data);
                console.log(error.response.data);
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
                color={errors?.content ? 'failure' : 'gray'}
            />
            <Button type='submit' disabled={isPending}>
                {isPending ?
                    (<PuffLoader size={30} color='#3b82f6' />) :
                    (<Send type='submit' className='cursor-pointer' />)}
            </Button>
        </form>
    )
}