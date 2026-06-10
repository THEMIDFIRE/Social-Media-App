import { Button, FieldError, Form, InputGroup, TextField } from '@heroui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
    
  };

  return (
    <>
      <div className="space-y-1.5">
        <h2 className='text-4xl font-bold'>Login to <span style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "#1E2A5E" }}>Reflect</span></h2>
        <p className='text-muted text-md'>Login to share your thoughts.</p>
      </div>
      <Form className='space-y-4 my-3' onSubmit={handleSubmit} method="post">
        <TextField className='w-full'
          isRequired
          name="email"
          type="text"
          validate={(value) => {
            if (!value) {
              return "Username or Email address is required";
            }
            if (value.length >= 2) {
              return null;
            }
          }}
        >
          <InputGroup className='focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
            <InputGroup.Prefix>
              <Mail size={16} className='text-muted' />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="Enter your email or username." className="p-0" />
          </InputGroup>
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password is required";
            }
            if (value.length >= 8) {
              return null;
            }
          }}
        >
          <InputGroup className='focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
            <InputGroup.Prefix>
              <KeyRound size={16} className='text-muted' />
            </InputGroup.Prefix>
            <InputGroup.Input type={isVisible ? "text" : "password"} placeholder="Enter your password" />
            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <FieldError />
        </TextField>
        <Button type="submit" className="rounded-md bg-[#1E2A5E] hover:bg-[#1E2A5E]/80" fullWidth>Sign In</Button>
      </Form>
      <p>Don&#39;t have an account?&nbsp;<Link to="/register" className='hover:underline font-bold'>Register</Link></p>
    </>
  )
}
