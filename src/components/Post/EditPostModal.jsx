import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, CloseIcon, FileInput, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import { Image } from 'iconsax-reactjs'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PuffLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { z } from 'zod'
import ServerAPI from '../shared/ServerAPI'

const schema = z.object({
  body: z.string().optional(),
  image: z.any().optional()
}).refine((data) => {
  const hasText = data.body && data.body.trim().length > 0;
  const hasImage = data.image && data.image.length > 0;
  return hasText || hasImage;
}, {
  message: 'Post must contain either text or an image',
  path: ["body"]
});

export default function EditPostModal({ isOpen, onClose, postData }) {
  const [previewImg, setPreviewImg] = useState(null)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (postData) {
      setValue('body', postData.body || '');
      if (postData.image) {
        setPreviewImg(postData.image);
      }
    }
  }, [postData, setValue]);

  const uploadImg = useRef()

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

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess: (data) => {
      setPreviewImg(null)
      toast.success('Post updated successfully!')
      onClose()
      queryClient.invalidateQueries({ queryKey: ['allPosts'] })
      queryClient.invalidateQueries({ queryKey: ['SinglePost'] })
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

  async function editPost(values) {
    const formData = new FormData();

    if (values.body && values.body.trim()) {
      formData.append('body', values.body.trim())
    }
    if (values.image && values.image.length > 0) {
      formData.append('image', values.image[0])
    }

    const { data } = await ServerAPI.put(`/posts/${postData._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  }


  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>
        <h2 className="font-bold">Edit Post</h2>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(mutate)}>
          <div className="flex items-center gap-x-2">
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
            <Button type="submit" className="bg-blue-800/90 w-full mt-4 cursor-pointer">Update Post</Button>}
        </form>
      </ModalBody>
    </Modal>
  )
}
