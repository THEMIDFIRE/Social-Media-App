import { Avatar, Card, Dropdown, DropdownItem, FooterDivider, TextInput } from 'flowbite-react'
import { Edit, Message, More, Send, Trash } from 'iconsax-reactjs'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'

export default function AllPosts() {

    const { userData } = useContext(userContext)

    return (
        <>
            <Card className='mb-3'>
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <div className='grow'>
                        <p className='font-bold'>{userData?.name}</p>
                        <span className='capitalize font-medium text-gray-600/50'>just now</span>
                    </div>
                    <Dropdown className='p-4' arrowIcon={false} inline label={
                        <More className='cursor-pointer'/>
                    } >

                        <div className='flex items-center'>
                            <Edit />
                            <DropdownItem>Edit</DropdownItem>
                        </div>
                        <div className='flex items-center'>
                            <Trash />
                            <DropdownItem>Delete</DropdownItem>
                        </div>
                    </Dropdown>

                </div>
                <div className='cursor-pointer'>
                    <p className='mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, earum.</p>
                    <img src="/3_3840x2160.jpg" alt="post caption" />
                </div>
                <div className='flex items-center gap-x-2'>
                    <Message />
                    <p className='capitalize'>123 comment</p>
                </div>
                <FooterDivider className='lg:my-1 my-1' />
                <Card className="mb-3 bg-gray-300/35">
                    <div className="flex items-center gap-x-2">
                        <Avatar img={userData?.photo} />
                        <div className='grow'>
                            <p className='font-bold'>{userData?.name}</p>
                            <span className='capitalize font-medium text-gray-600/50'>just now</span>
                        </div>
                        <Dropdown className='p-4' arrowIcon={false} inline label={
                            <More className='cursor-pointer'/>
                        } >

                            <div className='flex items-center'>
                                <Edit />
                                <DropdownItem>Edit</DropdownItem>
                            </div>
                            <div className='flex items-center'>
                                <Trash />
                                <DropdownItem>Delete</DropdownItem>
                            </div>
                        </Dropdown>
                    </div>
                    <p className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quia porro. Nulla!</p>
                </Card>
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput className="grow" placeholder="What's your comment?" />
                    <Send />
                </div>
            </Card>
            <Card className='mb-3'>
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <div className='grow'>
                        <p className='font-bold'>{userData?.name}</p>
                        <span className='capitalize font-medium text-gray-600/50'>just now</span>
                    </div>
                    <Dropdown className='p-4' arrowIcon={false} inline label={
                        <More className='cursor-pointer'/>
                    } >

                        <div className='flex items-center'>
                            <Edit />
                            <DropdownItem>Edit</DropdownItem>
                        </div>
                        <div className='flex items-center'>
                            <Trash />
                            <DropdownItem>Delete</DropdownItem>
                        </div>
                    </Dropdown>

                </div>
                <div className='cursor-pointer'>
                    <p className='mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, earum.</p>
                    {/* <img src="/3_3840x2160.jpg" alt="post caption" /> */}
                </div>
                <div className='flex items-center gap-x-2'>
                    <Message />
                    <p className='capitalize'>123 comment</p>
                </div>
                <FooterDivider className='lg:my-1 my-1' />
                <Card className="mb-3 bg-gray-300/35">
                    <div className="flex items-center gap-x-2">
                        <Avatar img={userData?.photo} />
                        <div className='grow'>
                            <p className='font-bold'>{userData?.name}</p>
                            <span className='capitalize font-medium text-gray-600/50'>just now</span>
                        </div>
                        <Dropdown className='p-4' arrowIcon={false} inline label={
                            <More />
                        } >

                            <div className='flex items-center'>
                                <Edit />
                                <DropdownItem>Edit</DropdownItem>
                            </div>
                            <div className='flex items-center'>
                                <Trash />
                                <DropdownItem>Delete</DropdownItem>
                            </div>
                        </Dropdown>
                    </div>
                    <p className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quia porro. Nulla!</p>
                </Card>
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput className="grow" placeholder="What's your comment?" />
                    <Send />
                </div>
            </Card>
            <Card className='mb-3'>
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <div className='grow'>
                        <p className='font-bold'>{userData?.name}</p>
                        <span className='capitalize font-medium text-gray-600/50'>just now</span>
                    </div>
                    <Dropdown className='p-4' arrowIcon={false} inline label={
                        <More />
                    } >

                        <div className='flex items-center'>
                            <Edit />
                            <DropdownItem>Edit</DropdownItem>
                        </div>
                        <div className='flex items-center'>
                            <Trash />
                            <DropdownItem>Delete</DropdownItem>
                        </div>
                    </Dropdown>

                </div>
                <div className='cursor-pointer'>
                    <p className='mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, earum.</p>
                    <img src="/3_3840x2160.jpg" alt="post caption" />
                </div>
                <div className='flex items-center gap-x-2'>
                    <Message />
                    <p className='capitalize'>123 comment</p>
                </div>
                <FooterDivider className='lg:my-1 my-1' />
                <Card className="mb-3 bg-gray-300/35">
                    <div className="flex items-center gap-x-2">
                        <Avatar img={userData?.photo} />
                        <div className='grow'>
                            <p className='font-bold'>{userData?.name}</p>
                            <span className='capitalize font-medium text-gray-600/50'>just now</span>
                        </div>
                        <Dropdown className='p-4' arrowIcon={false} inline label={
                            <More />
                        } >

                            <div className='flex items-center'>
                                <Edit />
                                <DropdownItem>Edit</DropdownItem>
                            </div>
                            <div className='flex items-center'>
                                <Trash />
                                <DropdownItem>Delete</DropdownItem>
                            </div>
                        </Dropdown>
                    </div>
                    <p className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quia porro. Nulla!</p>
                </Card>
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput className="grow" placeholder="What's your comment?" />
                    <Send />
                </div>
            </Card>
        </>
    )
}
