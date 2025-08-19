import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Card, Dropdown, DropdownItem } from "flowbite-react";
import { Edit, More, Trash } from "iconsax-reactjs";
import moment from "moment";
import { toast } from "react-toastify";

export default function CommentCard({ comment, isLatest = false }) {
    const commentData = isLatest
        ? comment?.comments?.[comment.comments.length - 1]
        : comment;

    // Comment Time formatting
    const commentCreateTime = moment(commentData?.createdAt);
    const commentTime = (() => {
        if (moment().diff(commentCreateTime, 'hours') < 24) {
            return commentCreateTime.fromNow()
        } else {
            return commentCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()

    // console.log('commentData', commentData)
    // Delete comment function
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: deleteComment,
        onSuccess: ()=> {
            toast.success()
        }
    })
    async function deleteComment(postId) {
        
    }


    return (
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
            <p className='truncate'>{commentData?.content}</p>
        </Card>
    )
}