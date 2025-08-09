import { Avatar, Card, Dropdown, DropdownItem, FooterDivider, TextInput } from 'flowbite-react'
import { Edit, Message, More, Send, Trash } from 'iconsax-reactjs'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'
import moment from 'moment'

export default function PostCard({ postData }) {

    const { userData } = useContext(userContext)

    // Post Created Time formating
    const postCreateTime = moment(postData.createdAt);
    const postTime = (() => {
        if (moment().diff(postCreateTime, 'hours') < 24) {
            return postCreateTime.startOf('hour').fromNow()
        } else {
            return postCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()
    // Latest Comment Time
    const commentCreateTime = moment(postData?.comments[0]?.createdAt);
    const commentTime = (() => {
        if (moment().diff(commentCreateTime, 'hours') < 24) {
            return commentCreateTime.startOf('hour').fromNow()
        } else {
            return commentCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()

    return (
        <>
            <Card className='mb-3'>
                {/* Card Header */}
                <div className="flex items-center gap-x-2">
                    <Avatar img={postData?.user?.photo} />
                    <div className='grow'>
                        <p className='font-medium'>{postData?.user?.name}</p>
                        <span className='capitalize font-medium text-gray-600/50'>{postTime}</span>
                    </div>
                    <Dropdown className='p-4' arrowIcon={false} inline label={
                        <More className='cursor-pointer' />
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
                {/* Card Content */}
                <div className='cursor-pointer'>
                    <p className='mb-3'>{postData?.body}</p>
                    {!postData?.image ? '' : <img src={postData?.image} alt={postData?.body} className='w-full aspect-auto object-cover' />}
                </div>
                <div className='flex items-center gap-x-2'>
                    <Message />
                    <p className='capitalize'>{postData?.comments.length} comment</p>
                </div>
                <FooterDivider className='lg:my-1 my-1' />
                {/* Latest comment card */}
                {!postData.comments.length ? '' :
                <Card className="mb-3 bg-gray-300/35">
                    <div className="flex items-center gap-x-2">
                        <Avatar img={!postData?.comments[0]?.commentCreator?.photo.includes('undefined') ? postData?.comments[0]?.commentCreator?.photo : null} />
                        <div className='grow'>
                            <p className='font-bold'>{postData?.comments[0]?.commentCreator?.name}</p>
                            <span className='capitalize font-medium text-gray-600/50'>{commentTime}</span>
                        </div>
                        <Dropdown className='p-4' arrowIcon={false} inline label={
                            <More className='cursor-pointer' />
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
                    <p className='truncate'>{postData?.comments[0]?.content}</p>
                </Card>}
                <div className="flex items-center gap-x-2">
                    <Avatar img={userData?.photo} />
                    <TextInput className="grow" placeholder="What's your comment?" />
                    <Send />
                </div>
            </Card>
        </>
    )

}
