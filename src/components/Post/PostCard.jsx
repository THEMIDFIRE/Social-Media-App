import { Avatar, Card, Dropdown, DropdownItem, FooterDivider } from 'flowbite-react'
import { Edit, Message, More, Trash } from 'iconsax-reactjs'
import moment from 'moment'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'
import CreateComment from '../comment/CreateComment'
import CommentCard from '../comment/CommentCard'
import { Link } from 'react-router'

export default function PostCard({ postData }) {

    // Post Created Time formating
    const postCreateTime = moment(postData.createdAt);
    const postTime = (() => {
        if (moment().diff(postCreateTime, 'hours') < 24) {
            return postCreateTime.fromNow()
        } else {
            return postCreateTime.format('MMM-DD-YYYY, hh:mm A')
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
                    <Link to={'/posts/' + postData._id}>
                        <p className='mb-3'>{postData?.body}</p>
                        {!postData?.image ? '' : <img src={postData?.image} alt={postData?.body} className='w-full aspect-auto object-cover' />}
                    </Link>
                </div>
                <div className='flex items-center gap-x-2'>
                    <Message />
                    <p className='capitalize'>{postData?.comments.length} comment</p>
                </div>
                <FooterDivider className='lg:my-1 my-1' />
                {/* Latest comment card */}
                {!postData?.comments?.length ? '' : <CommentCard postData={postData} />}
                {/* Create Comment Input */}
                <CreateComment postId={postData?._id} />
            </Card>
        </>
    )

}
