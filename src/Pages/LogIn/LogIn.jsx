import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as z from 'zod';
import ErrorMsg from '../../components/shared/ErrorMsg';
import { userContext } from '../../context/userContext';
import ServerAPI from '../../components/shared/ServerAPI';
import { toast } from 'react-toastify';

const schema = z.object({
    email: z.email(),
    password: z.string().min(8, 'Invalid password, must be 8 characters or more').regex(/^[A-Z][\w]/),
})

export default function LogIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    const { getUserData } = useContext(userContext)
    const redirect = useNavigate();
    async function getUser(values) {
        try {
            const { data } = await ServerAPI.post('/users/signin', values);
            localStorage.setItem('token', data?.token)
            getUserData(data?.token)
            redirect('/')
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
    return (
        <>
            <div className='h-full pt-40'>
                <form className="flex flex-col mx-auto gap-4 max-w-4/5 md:max-w-1/2" onSubmit={handleSubmit(getUser)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
                        </div>
                        <TextInput id="email" type="email" placeholder="name@example.com" {...register('email')} />
                        <ErrorMsg error={errors?.email?.message} className='absolute bottom-0 left-0 translate-y-full text-red-500' />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Your password</Label>
                        </div>
                        <TextInput id="password" type="password" {...register('password')} />
                        <ErrorMsg error={errors?.password?.message} className='absolute bottom-0 left-0 translate-y-full text-red-500' />
                    </div>
                    <p>don't have an account? <Link to={'/register'}>Register</Link></p>
                    <Button type="submit">Login</Button>
                </form>
            </div>

        </>
    )
}
