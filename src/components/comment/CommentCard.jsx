import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Card, Dropdown, DropdownItem } from "flowbite-react";
import { Edit, More, Trash } from "iconsax-reactjs";
import moment from "moment";
import { toast } from "react-toastify";
import ServerAPI from "../shared/ServerAPI";
import { useState } from "react";
import EditCommentModal from "./EditCommentModal";

export default function CommentCard({ comment, isLatest = false, postUserId }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const commentData = isLatest
        ? comment?.comments?.[comment.comments.length - 1]
        : comment;
        const userId = localStorage.getItem('userId')
        const commentUserId = commentData?.commentCreator?._id  || commentData?.user?._id

    // Comment Time formatting
    const commentCreateTime = moment(commentData?.createdAt);
    const commentTime = (() => {
        if (moment().diff(commentCreateTime, 'hours') < 24) {
            return commentCreateTime.fromNow()
        } else {
            return commentCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()

    const commentId = (() => {
        // If it's the latest comment in the post card
        if (isLatest && comment?.comments?.length > 0) {
            // Get the latest comment (last in the array)
            const latestComment = comment.comments[comment.comments.length - 1];
            return latestComment?._id;
        }
        // If it's a regular comment with direct _id
        if (comment?._id) {
            return comment._id;
        }
        // If comment data is nested in a different structure
        if (comment?.comment?._id) {
            return comment.comment._id;
        }
        console.error('Could not determine comment ID', comment);
        return null;
    })();

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteComment,
        onSuccess: (data) => {
            toast.success('Comment deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['allComments'] });
            queryClient.invalidateQueries({ queryKey: ['SinglePost'] });
            queryClient.invalidateQueries({ queryKey: ['allPosts'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete comment');
        }
    });
    async function deleteComment() {
        const { data } = await ServerAPI.delete(`/comments/${commentId}`)
        return data
    }

    /*console.log('Comment data:', { 
        comment, 
        isLatest, 
        commentId,
        comments: comment?.comments 
    });
    console.log('Rendering CommentCard with:', {
        commentId,
        commentData,
        isLatest,
        comment
    });*/


    return (
        <>
            <Card className="mb-3 bg-gray-300/35">
                <div className="flex items-center gap-x-2">
                    <Avatar
                        img={!commentData?.commentCreator?.photo?.includes('undefined')
                            ? commentData?.commentCreator?.photo
                            : null
                        }
                    />
                    <div className='grow'>
                        <p className='font-bold'>{commentData?.commentCreator?.name}</p>
                        <span className='capitalize font-medium text-gray-600/50'>{commentTime}</span>
                    </div>
                    {userId === postUserId &&
                        <Dropdown arrowIcon={false} inline label={
                            <More className='cursor-pointer' />
                        } >
                            <DropdownItem className="flex gap-x-2.5 items-center" onClick={() => setIsEditModalOpen(true)}><Edit />Edit</DropdownItem>
                            <DropdownItem className="flex gap-x-2.5 items-center" onClick={() => mutate(commentId)}><Trash /> Delete</DropdownItem>
                        </Dropdown>
                    }
                </div>
                <p className='truncate'>{commentData?.content}</p>
            </Card>
            <EditCommentModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} commentId={commentId} comment={commentData}/>
        </>
    )
}