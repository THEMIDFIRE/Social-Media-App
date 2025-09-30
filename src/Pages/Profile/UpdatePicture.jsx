import React, { useRef, useState } from 'react'
import { Avatar, Button, CloseIcon, FileInput, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { PuffLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import ServerAPI from '../../components/shared/ServerAPI';
import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
    photo: z.any().optional()
}).refine((data) => {
    const hasImage = data.photo && data.photo.length > 0;
    return hasImage;
});

export default function UpdatePicture({ isOpen, onClose }) {
    const { register, setValue } = useForm({
        resolver: zodResolver(schema)
    })
    const uploadImg = useRef()
    const [previewImg, setPreviewImg] = useState(null)
    const { id } = useParams();
    const { getUserData } = useContext(userContext)

    function handleImageChange(e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setValue('photo', file);
            setPreviewImg(URL.createObjectURL(file));
        }
    }

    function rmvImg() {
        if (previewImg) {
            URL.revokeObjectURL(previewImg);
        }

        setPreviewImg(null)
        setValue('photo', null)
        if (uploadImg.current) {
            uploadImg.current.value = ''
        }
    }


    const queryClient = useQueryClient();
    const { mutate: updateProfilePic, isPending: isUpdating } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await ServerAPI.put(`/users/upload-photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        },
        onSuccess: (data) => {
            getUserData()
            setPreviewImg(null);
            toast.success('Profile picture updated successfully!');
            onClose()
            if (uploadImg.current) {
                uploadImg.current.value = '';
            }
            queryClient.invalidateQueries({ queryKey: ['profile', id] });
        },
        onError: (error) => {
            console.error('Error updating profile picture:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile picture!');
        }
    });

    async function updatePic() {
        const fileInput = uploadImg.current;
        if (!fileInput?.files?.length) {
            toast.error('No file selected');
            return;
        }

        const file = fileInput.files[0];
        console.log('Selected file:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // Check file size (e.g., 4MB limit)
        const maxSize = 4 * 1024 * 1024; // 4MB
        if (file.size > maxSize) {
            toast.error('Image size should be less than 4MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        const formData = new FormData();
        formData.append('photo', file);

        try {
            updateProfilePic(formData);
        } catch (error) {
            console.error('Error in updatePic:', error);
            toast.error('Failed to process the image. Please try again.');
        }
    }
        return (
            <>
                <Modal show={isOpen} onClose={onClose} dismissible>
                    <ModalHeader>
                        Change Profile Picture
                    </ModalHeader>
                    <ModalBody>
                        <FileInput
                            {...register('photo')}
                            accept="image/*"
                            ref={uploadImg}
                            onChange={handleImageChange}
                        />
                        {previewImg && (
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                <div className="relative">
                                    <img
                                        src={previewImg}
                                        alt="Preview"
                                        className="object-cover size-60 rounded"
                                    />
                                    <CloseIcon
                                        onClick={rmvImg}
                                        className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                    />
                                </div>
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={updatePic} disabled={isUpdating} >
                            {isUpdating ? <PuffLoader size={20} color="#3b82f6" /> : 'Update'}
                        </Button>
                        <Button onClick={() => setIsEditModalOpen(false)} color="gray">Cancel</Button>
                    </ModalFooter>
                </Modal>

            </>
        )
    }
