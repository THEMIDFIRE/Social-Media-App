import { Avatar, Card, Dropdown, DropdownItem } from 'flowbite-react';
import { Edit, More, Trash } from 'iconsax-reactjs';
import moment from 'moment';

export default function SingleComment({ comment }) {
    // Latest Comment Time
    const commentCreateTime = moment(comment?.comments?.[comment.comments.length - 1]?.createdAt);
    const commentTime = (() => {
        if (moment().diff(commentCreateTime, 'hours') < 24) {
            return commentCreateTime.fromNow()
        } else {
            return commentCreateTime.format('MMM-DD-YYYY, hh:mm A')
        }
    })()
    return (
        <Card className="mb-3 bg-gray-300/35">
            <div className="flex items-center gap-x-2">
                <Avatar img={!comment?.comments[0]?.commentCreator?.photo.includes('undefined') ? comment?.comments[0]?.commentCreator?.photo : null} />
                <div className='grow'>
                    <p className='font-bold'>{comment?.comments?.[comment.comments.length - 1]?.commentCreator?.name}</p>
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
            <p className='truncate'>{comment?.comments?.[comment.comments.length - 1]?.content}</p>
        </Card>
    )
}