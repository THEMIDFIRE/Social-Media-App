import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from 'flowbite-react'
import React from 'react'
import ErrorMsg from '../../components/shared/ErrorMsg'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ServerAPI from '../../components/shared/ServerAPI';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function ChangePassword({ isOpen, onClose }) {
    const schema = z.object({
        password: z.string().min(8, 'Password must be 8 characters or more and starts with a capital letter').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {errorMap: (issue) => ({
            message: 'Password must be 8 characters or more and starts with a capital letter'
        })}),
        newPassword: z.string().min(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    })

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ resolver: zodResolver(schema) });

    const { mutate: changePassword, isPending } = useMutation({
        mutationFn: async (passwordData) => {
            const { data } = await ServerAPI.patch('/users/change-password', passwordData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return data;
        }, onSuccess: (data) => {
            toast.success('Password changed successfully!');
            onClose();
        }, 
        onError: (error) => {
            console.error('Error updating password:', error);
            toast.error(error.response?.data?.message || 'Failed to update password!');
        }
    })
    return (
        <>
            <Modal show={isOpen} onClose={onClose}>
                <ModalHeader>
                    Change Password
                </ModalHeader>
                <ModalBody>
                    <form className="flex flex-col mx-auto gap-4 max-w-4/5 md:max-w-1/2" onSubmit={handleSubmit(changePassword)}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password">Old Password</Label>
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                {...register('password')}
                            />
                            <ErrorMsg error={errors?.password?.message} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="newPassword">New Password</Label>
                            </div>
                            <TextInput
                                id="newPassword"
                                type="password"
                                {...register('newPassword')}
                            />
                            <ErrorMsg error={errors?.newPassword?.message} />
                        </div>
                        <Button type='submit' disabled={isPending}>Update Password</Button>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}
