import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router'
import CommentCard from './CommentCard'
import ServerAPI from '../shared/ServerAPI'

export default function AllComments({ postId }) {
    const { id } = useParams()
    const commentId = postId || id 

    if (!commentId) {
        return null
    }

    const { data, isLoading } = useQuery({
        queryFn: getAllComments,
        queryKey: ['allComments', commentId],
        select: (data) => data.comments,
        enabled: !!commentId 
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
                    <CommentCard comment={comment} key={comment._id} />
                ))
            }
        </>
    )
}