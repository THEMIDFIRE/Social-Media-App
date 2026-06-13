import { Button, FieldError, Form, InputGroup, ListBox, TextField, Select, DatePicker, DateField, Calendar } from '@heroui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { AtSign, CalendarIcon, Eye, EyeOffIcon, KeyRound, MailIcon, User2, Users2 } from 'lucide-react';
import { useState } from 'react';
import { I18nProvider, useDateFormatter } from '@react-aria/i18n';

export const Route = createFileRoute('/(auth)/_auth/register')({
    component: RouteComponent,
})

function RouteComponent() {
    const [isPassVisible, setIsPassVisible] = useState(false)
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false)
    const formatter = useDateFormatter({ month: "short" });

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
            <h2 className='text-3xl font-bold'>Create a new account</h2>
            <Form className='space-y-4 my-3' onSubmit={handleSubmit} method="post">
                {/* Full Name */}
                <TextField className='w-full'
                    isRequired
                    name="fullName"
                    type="text"
                    validate={(value) => {
                        if (!value) {
                            return "Full name is required";
                        }
                        if (value.length >= 2) {
                            return null;
                        }
                    }}
                >
                    <InputGroup className='focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
                        <InputGroup.Prefix>
                            <User2 size={16} className='text-muted' />
                        </InputGroup.Prefix>
                        <InputGroup.Input placeholder="Full Name" className="p-0" />
                    </InputGroup>
                    <FieldError />
                </TextField>

                {/* Username (Optional) */}
                <TextField className='w-full' name="username" type="text">
                    <InputGroup className='focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
                        <InputGroup.Prefix>
                            <AtSign size={16} className='text-muted' />
                        </InputGroup.Prefix>
                        <InputGroup.Input placeholder="Username (Optional)" className="p-0" />
                    </InputGroup>
                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField className='w-full'
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Email is required";
                        }
                        return null;
                    }}
                >
                    <InputGroup className='focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
                        <InputGroup.Prefix>
                            <MailIcon size={16} className='text-muted' />
                        </InputGroup.Prefix>
                        <InputGroup.Input placeholder="Email Address" className="p-0" />
                    </InputGroup>
                    <FieldError />
                </TextField>

                {/* Gender */}
                <Select isRequired name="gender" placeholder="Select Gender" fullWidth className="">
                    <div className='flex flex-row items-center gap-0 focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
                        <Users2 size={16} className='text-muted w-10' />
                        <Select.Trigger className="pl-0">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="male" textValue="Male">
                                    Male
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="female" textValue="Female">
                                    Female
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </div>
                    <FieldError>Gender is required.</FieldError>
                </Select>

                {/* Date of Birth */}
                <I18nProvider locale="en-GB">
                    <DatePicker name="Date of Birth" isRequired className="w-full">
                        <DateField.Group fullWidth className="focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md">
                            <DateField.Prefix>
                                <CalendarIcon size={16} className='text-muted' />
                            </DateField.Prefix>
                            <DateField.Input>
                                {(segment) => {
                                    if (segment.type === "month") {
                                        const monthNumber = segment.value ?? 0;
                                        const date = new Date(2000, monthNumber - 1, 1);
                                        const monthName = formatter.format(date);
                                        return (
                                            <DateField.Segment segment={segment}>
                                                {monthNumber ? monthName : 'mmm'}
                                            </DateField.Segment>
                                        );
                                    }
                                    return (
                                        <DateField.Segment segment={segment}>
                                            {segment.text}
                                        </DateField.Segment>
                                    );
                                }}
                            </DateField.Input>
                            <DateField.Suffix>
                                <DatePicker.Trigger>
                                    <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                            </DateField.Suffix>
                        </DateField.Group>
                        <FieldError>Date of Birth is required.</FieldError>
                        <DatePicker.Popover>
                            <Calendar aria-label="Event date">
                                <Calendar.Header>
                                    <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                    </Calendar.YearPickerTrigger>
                                    <Calendar.NavButton slot="previous" />
                                    <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                    <Calendar.GridHeader>
                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                    <Calendar.YearPickerGridBody>
                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>
                </I18nProvider>
                {/* Password */}
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
                    <InputGroup className='relative focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
                        <InputGroup.Prefix>
                            <KeyRound size={16} className='text-muted' />
                        </InputGroup.Prefix>
                        <InputGroup.Input type={isPassVisible ? "text" : "password"} placeholder="Password" />
                        <InputGroup.Suffix className="pr-0 absolute right-0">
                            <Button
                                isIconOnly
                                aria-label={isPassVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsPassVisible(!isPassVisible)}
                            >
                                {isPassVisible ? <Eye className="size-4" /> : <EyeOffIcon className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError />
                </TextField>

                {/*Confirm Password */}
                <TextField
                    isRequired
                    minLength={8}
                    name="confirmPassword"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Please confirm your password.";
                        }
                        if (value.length >= 8) {
                            return null;
                        }
                    }}
                >
                    <InputGroup className='relative focus-within:ring-1 focus-within:ring-[#1E2A5E] rounded-md'>
                        <InputGroup.Prefix>
                            <KeyRound size={16} className='text-muted' />
                        </InputGroup.Prefix>
                        <InputGroup.Input type={isConfirmPassVisible ? "text" : "password"} placeholder="Confirm Password" />
                        <InputGroup.Suffix className="pr-0 absolute right-0">
                            <Button
                                isIconOnly
                                aria-label={isConfirmPassVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsConfirmPassVisible(!isConfirmPassVisible)}
                            >
                                {isConfirmPassVisible ? <Eye className="size-4" /> : <EyeOffIcon className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError />
                </TextField>
                <Button type="submit" className="rounded-md bg-[#1E2A5E] hover:bg-[#1E2A5E]/80" fullWidth>Sign In</Button>
            </Form>
            <p>Have an account?&nbsp;<Link to="/" className='hover:underline font-bold'>Log In</Link></p>
        </>
    )
}
