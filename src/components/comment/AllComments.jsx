import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router'
import ServerAPI from '../shared/ServerAPI'
import CommentCard from './CommentCard'

export default function AllComments({ postId, postUserId }) {
    const { id } = useParams()
    const commentId = postId || id 

    if (!commentId) {
        return null
    }

    const { data, isLoading } = useQuery({
        queryFn: getAllComments,
        queryKey: ['allComments', commentId],
        select: (data) => data.comments,
    })

    async function getAllComments() {
        if (!commentId) {
            throw new Error('No post ID provided')
        }
        
        try {
            const res = await ServerAPI(`/posts/${commentId}/comments`)
            return res.data
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            {isLoading ?
                <Skeleton count={3} className='h-40 mb-3' />
                :
                data?.slice().reverse()?.map((comment) => (
                    <CommentCard comment={comment} key={comment._id} postId={commentId} postUserId={postUserId}/>
                ))
            }
        </>
    )
}