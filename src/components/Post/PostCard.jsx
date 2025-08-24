import { Avatar, Card, Dropdown, DropdownItem, FooterDivider } from 'flowbite-react'
import { Edit, Message, More, Trash } from 'iconsax-reactjs'
import moment from 'moment'
import { Link } from 'react-router'
import AllComments from '../comment/AllComments'
import CommentCard from '../comment/CommentCard'
import CreateComment from '../comment/CreateComment'

export default function PostCard({ postData, id }) {

    // Post Created Time formatting
    const postCreateTime = moment(postData.createdAt);
    const postTime = (() => {
        if (moment().diff(postCreateTime, 'hours') < 24) {
            return postCreateTime.fromNow()
        } else {
            return postCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()

    function deletePost() {
        console.log('postData', postData)
        // In case of my post
        // postData._id/id = post id <==> send to delete post api
        // postData.user._id = my id <==> delete anything
        // postData.comments.post = post id
        // postData.comments._id = comment id <==> send to api
        // postData.comments.commentCreator._id = delete my comment
        // in case of other's post
        // postData.comments.commentCreator._id = my id/comment <==> send to api
    }

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
                    <Dropdown arrowIcon={false} inline label={
                        <More className='cursor-pointer' />
                    } >
                        <DropdownItem className="flex gap-x-2.5 items-center"><Edit />Edit</DropdownItem>
                        <DropdownItem className="flex gap-x-2.5 items-center" onClick={deletePost}><Trash /> Delete</DropdownItem>
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
                {id ? <AllComments postId={id} /> :
                    (!postData?.comments?.length ? '' :
                        <CommentCard comment={postData} isLatest={true} />)
                }
                {/* Create Comment Input */}
                <CreateComment postId={postData?._id} />
            </Card>
        </>
    )
}