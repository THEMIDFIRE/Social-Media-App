import { Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import { Send } from 'iconsax-reactjs'
import React, { useEffect } from 'react'
import { PuffLoader } from 'react-spinners'
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as z from 'zod';
import ServerAPI from '../shared/ServerAPI';


const schema = z.object({
    content: z.string().min(1).max(30)
})

export default function EditCommentModal({ isOpen, onClose, commentId, comment }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

    useEffect(() => {
        if (comment) {
            reset({ content: comment.content })
        }
    }, [comment])

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: editComment,
        onSuccess: (data) => {
            reset()
            toast.success('Comment updated successfully!')
            onClose()
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

    async function editComment({ content }) {
        const commentData = { content }
        const { data } = await ServerAPI.put(`/comments/${commentId}`, commentData)
        return data
    }

  return (
    <Modal show={isOpen} onClose={onClose}>
        <ModalHeader>
            <h2 className='font-bold'>Edit Comment</h2>
        </ModalHeader>
        <ModalBody>
        <form className="flex items-center gap-x-2" onSubmit={handleSubmit((data) => mutate(data))}>
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
        </ModalBody>
    </Modal>
  )
}
