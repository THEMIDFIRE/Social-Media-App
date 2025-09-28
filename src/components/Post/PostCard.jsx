import { Avatar, Card, Dropdown, DropdownItem, FooterDivider } from 'flowbite-react'
import { Edit, Message, More, Trash } from 'iconsax-reactjs'
import moment from 'moment'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import AllComments from '../comment/AllComments'
import CommentCard from '../comment/CommentCard'
import CreateComment from '../comment/CreateComment'
import { toast } from 'react-toastify'
import ServerAPI from '../shared/ServerAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import EditPostModal from './EditPostModal'


export default function PostCard({ postData, id }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const redirect = useNavigate()

    // Post Created Time formatting
    const postCreateTime = moment(postData.createdAt);
    const postTime = (() => {
        if (moment().diff(postCreateTime, 'hours') < 24) {
            return postCreateTime.fromNow()
        } else {
            return postCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()

    const userId = localStorage.getItem('userId')
    const postId = postData._id
    const postUserId = postData.user._id
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: (data) => {
            toast.success('Post deleted successfully');
            if (id) {
                redirect('/')
            }
            queryClient.invalidateQueries({ queryKey: ['allPosts'] });
            queryClient.invalidateQueries({ queryKey: ['SinglePost'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete post');
        }
    });
    // Delete Post
    async function deletePost() {
        const { data } = await ServerAPI.delete(`/posts/${postId}`)
        return data
    }

    const isLongText = postData?.body?.length > 200
    const shouldTruncate = isLongText && !isExpanded

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
                    {userId === postUserId &&
                        <Dropdown arrowIcon={false} inline label={
                            <More className='cursor-pointer' />
                        } >
                            <DropdownItem className="flex gap-x-2.5 items-center" onClick={() => setIsEditModalOpen(true)}><Edit />Edit</DropdownItem>
                            <DropdownItem className="flex gap-x-2.5 items-center" onClick={() => mutate(postId)}><Trash /> Delete</DropdownItem>
                        </Dropdown>
                    }
                </div>

                <div className='cursor-pointer'>
                    <Link to={'/posts/' + postData._id}>
                        <div className='mb-3'>
                            <p className={`
                                break-words 
                                whitespace-pre-wrap 
                                ${shouldTruncate ? 'line-clamp-3' : ''}
                            `}>
                                {shouldTruncate
                                    ? postData?.body?.substring(0, 200) + '...'
                                    : postData?.body
                                }
                            </p>
                            {isLongText && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsExpanded(!isExpanded)
                                    }}
                                    className='text-blue-500 hover:text-blue-700 text-sm font-medium mt-1'
                                >
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </button>
                            )}
                        </div>
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
                    !postData?.comments?.length ? null : (
                        <CommentCard
                            comment={{
                                ...postData,
                                isLatestComment: true
                            }}
                            isLatest={true}
                            postUserId={postUserId}
                            key={`latest-${postData.comments[postData.comments.length - 1]?._id}`}
                        />
                    )
                }

                {/* Create Comment Input */}
                <CreateComment postId={postData?._id} />
            </Card>
            <EditPostModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} postData={postData} />
        </>
    )
}