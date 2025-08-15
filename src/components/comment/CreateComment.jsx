import React, { useContext } from 'react'
import { userContext } from '../../context/userContext'
import { Avatar, Button, TextInput } from 'flowbite-react'
import { Send } from 'iconsax-reactjs'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export default function CreateComment({ postId }) {
    const { userData } = useContext(userContext)
    const { register, handleSubmit } = useForm()

    async function createComment({content}) {
        const commentData = {content , post: postId}
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/comments`, {
                method: 'POST',
                headers: { token: localStorage.getItem('token') },
                data: commentData
            });
            console.log('success');
            
        } catch (error) {
            console.log('error', error)

        }
    }

    return (
        <form className="flex items-center gap-x-2" onSubmit={handleSubmit(createComment)}>
            <Avatar img={userData?.photo} />
            <TextInput {...register('content')} className="grow" placeholder="What's your comment?" name='content' maxLength={30} />
            <Button type='submit'>
            <Send type='submit' className='cursor-pointer'/>
            </Button>
        </form>
    )
}
