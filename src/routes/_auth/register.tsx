import type { DateValue } from '@internationalized/date'

import { DateField, FieldError, Form, I18nProvider, Input, Label, ListBox, TextField, Select, Button } from '@heroui/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'


export const Route = createFileRoute('/_auth/register')({
    component: RegisterPage,
})

function RegisterPage() {
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState<DateValue | null>(null)

    return (
        <>
            <Form className='space-y-4.5 my-6'>
                <div className='flex gap-4 *:w-full'>
                    {/* Name */}
                    <TextField
                        isRequired
                        name='name'
                        validate={(value) => {
                            if (value.length < 3) {
                                return 'Name must be at least 3 characters long';
                            }

                            return null;
                        }}
                    >
                        <Label>Name</Label>
                        <Input placeholder='Your name' />
                        <FieldError />
                    </TextField>

                    {/* Username */}
                    <TextField
                        isRequired
                        name='username'
                        validate={(value) => {
                            if (value.length < 3) {
                                return 'Username must be at least 3 characters long';
                            }

                            return null;
                        }}
                    >
                        <Label>Username</Label>
                        <Input placeholder='your.handle' />
                        <FieldError />
                    </TextField>
                </div>

                {/* Email */}
                <TextField
                    isRequired
                    name='email'
                    type='email'
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return 'Please enter a valid email address';
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder='you@example.com' />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name='password'
                    type='password'
                    validate={(value) => {
                        if (value.length < 8) {
                            return 'Password must be at least 8 characters long';
                        }

                        return null;
                    }}
                    onChange={setPassword}
                >
                    <Label>Password</Label>
                    <Input placeholder='At least 8 characters' />
                    <FieldError />
                </TextField>

                {/* Confirm Password */}
                <TextField
                    isRequired
                    name='rePassword'
                    type='password'
                    validate={(value) => {
                        if (value !== password) {
                            return 'Passwords do not match';
                        }

                        return null;
                    }}
                >
                    <Label>Confirm Password</Label>
                    <Input placeholder='Repeat password' />
                    <FieldError />
                </TextField>

                <div className='flex gap-4 *:w-full'>
                    {/* Date of Birth */}
                    <I18nProvider locale='en-GB'>
                        <DateField
                            isRequired
                            name='dateOfBirth'
                            value={dateOfBirth}
                            onChange={setDateOfBirth}
                        >
                            <Label>Date of Birth</Label>
                            <DateField.Group>
                                <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                            </DateField.Group>
                            <FieldError />
                        </DateField>
                    </I18nProvider>

                    {/* Gender */}
                    <Select isRequired name='gender' placeholder='Select'>
                        <Label>Gender</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id='male' textValue='Male'>
                                    Male
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id='female' textValue='Female'>
                                    Female
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
                <Button className='w-full'>Create Account</Button>
            </Form >
            <p className='text-center'>Already have an account? <Link className='underline' to='/login'>Sign in</Link></p>
        </>
    )
}
