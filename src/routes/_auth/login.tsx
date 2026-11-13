import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <>
      <Form className='space-y-4.5 my-6'>
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
        >
          <Label>Password</Label>
          <Input placeholder='Your Password' />
          <FieldError />
        </TextField>

        <Button className='w-full'>Sign in</Button>
      </Form >
      <p className='text-center'>New here? <Link className='underline' to='/register'>Create an account</Link></p>
    </>
  )
}
