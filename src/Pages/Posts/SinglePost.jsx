import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import PostCard from '../../components/Post/PostCard';

export default function SinglePost() {
    const { id } = useParams()

    const { data, isLoading } = useQuery({
        queryFn: getSinglePost,
        queryKey: ['SinglePost', id]
    })
    
    async function getSinglePost() {
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
                headers: { token: localStorage.getItem('token') }
            })
            return data.post
        } catch (error) {
            return error
        }
    }

    return (
        <>
            {isLoading ?
                <Skeleton count={3} className='h-96 mb-3' />
                :
                <PostCard postData={data} id={id} />}
        </>
    )
}