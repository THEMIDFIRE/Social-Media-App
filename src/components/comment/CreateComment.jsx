import axios from 'axios'
import { Avatar, Button, TextInput } from 'flowbite-react'
import { Send } from 'iconsax-reactjs'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { userContext } from '../../context/userContext'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    content: z.string().min(1)
})

export default function CreateComment({ postId }) {
    const { userData } = useContext(userContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

    async function createComment({ content }) {
        const commentData = { content, post: postId }
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/comments`, {
                method: 'POST',
                headers: { token: localStorage.getItem('token') },
                data: commentData
            });
            reset()
            console.log('success');

        } catch (error) {
            console.log('error', error)
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
