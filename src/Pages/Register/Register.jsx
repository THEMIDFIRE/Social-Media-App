import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Button, Datepicker, Label, Radio, TextInput } from 'flowbite-react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as z from 'zod';
import ErrorMsg from '../../components/shared/ErrorMsg';
import ServerAPI from '../../components/shared/ServerAPI';

// {
//     "name": "Ahmed Bahnasy",
//     "email":"bahnasy2040@gmail.com",
//     "password":"Bahnasy@123",
//     "rePassword":"Bahnasy@123",
//     "dateOfBirth":"7-10-1994",
//     "gender":"male"
// }
export default function Register() {
    const schema = z.object({
        name: z.string('Name not valid').min(3, 'Name must be more than 3 characters'),
        email: z.email(),
        password: z.string().min(8, 'Password must be 8 characters or more and starts with a capital letter').regex(/^[A-Z][\w]/),
        rePassword: z.string().min(8).regex(/^[A-Z][\w]/).refine((value) => value === getValues('password'), { error: 'Password must be the same' }),
        dateOfBirth: z.string(),
        gender: z.literal(['male', 'female'], 'Invalid gender choosen'),
    })

    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({ resolver: zodResolver(schema) });

    const redirect = useNavigate();


    async function createUser(data) {
        try {
            await ServerAPI.post('/users/signup', data)
            redirect('/login');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className='pt-16'>
                <form className="flex flex-col mx-auto gap-4 max-w-4/5 md:max-w-1/2" onSubmit={handleSubmit(createUser)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name">Your Name</Label>
                        </div>
                        <TextInput id="name" type="text" placeholder="John Doe" {...register('name')} />
                        <ErrorMsg error={errors?.name?.message} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
                        </div>
                        <TextInput id="email" type="email" placeholder="name@example.com" {...register('email')} />
                        <ErrorMsg error={errors?.email?.message} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Your password</Label>
                        </div>
                        <TextInput id="password" type="password" {...register('password')} />
                        <ErrorMsg error={errors?.password?.message} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="rePassword">Repeat password</Label>
                        </div>
                        <TextInput id="rePassword" type="password" {...register('rePassword')} />
                        <ErrorMsg error={errors?.rePassword?.message} />

                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Controller
                                render={({ field }) => (
                                    <Datepicker
                                        {...field}
                                        onChange={(value) => {
                                            const formatDate = value.toLocaleDateString('en-us', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            }).replaceAll('/', '-')
                                            field.onChange(formatDate)
                                        }}
                                        id='dateOfBirth'
                                        value={field.value}
                                    />
                                )}
                                name='dateOfBirth'
                                control={control}
                            />
                        </div>
                        <ErrorMsg error={errors?.dateOfBirth?.message} />
                    </div>
                    <div className='flex gap-x-4'>
                        <div className="flex items-center gap-x-1.5">
                            <Radio id="male" name="male" value="male" {...register('gender')} />
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                            <Radio id="female" name="female" value="female" {...register('gender')} />
                            <Label htmlFor="female">Female</Label>
                        </div>
                        <ErrorMsg error={errors?.gender?.message} />
                    </div>
                    <p>Have an account? <Link to={'/login'}>Log in</Link></p>
                    <Button type="submit">Register new account</Button>
                </form>
            </div>
        </>

    )
}
