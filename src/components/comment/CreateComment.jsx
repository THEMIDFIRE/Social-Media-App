import axios from 'axios'
import { Avatar, Button, TextInput } from 'flowbite-react'
import { Send } from 'iconsax-reactjs'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { userContext } from '../../context/userContext'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import * as z from 'zod'

const schema = z.object({
    content: z.string().min(1)
})

export default function CreateComment({ postId }) {
    const { userData } = useContext(userContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

    async function createComment({ content }) {
        const commentData = { content, post: postId }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, commentData, {
                headers: { token: localStorage.getItem('token') },
            });
            reset()
            toast.success(data.message)
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
                toast.error(error.response.status);
                toast.error(error.response.headers);
            } else if (error.request) {
                toast.error(error.request);
            } else {
                toast.error('Error', error.message);
            }
        }
    }

    return (
        <form className="flex items-center gap-x-2" onSubmit={handleSubmit(createComment)}>
            <Avatar img={userData?.photo} />
            <TextInput
                className="grow"
                placeholder="What's your comment?"
                {...register('content')}
                maxLength={30}
                color={errors?.content ? 'failure' : 'gray'}
            />
            <Button type='submit'>
                <Send type='submit' className='cursor-pointer' />
            </Button>
        </form>
    )
}
