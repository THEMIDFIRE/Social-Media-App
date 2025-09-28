import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import PostCard from '../../components/Post/PostCard';
import ServerAPI from '../../components/shared/ServerAPI';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'iconsax-reactjs';

export default function SinglePost() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryFn: getSinglePost,
        queryKey: ['SinglePost', id]
    })

    async function getSinglePost() {
        try {
            const { data } = await ServerAPI(`/posts/${id}`)
            return data.post
        } catch (error) {
            return error
        }
    }

    return (
        <>
        <Button onClick={() => navigate(-1)} className='mb-3' color='dark' outline size='xs'><ArrowLeft className='mr-2' />Back</Button>
            {isLoading ?
                <Skeleton count={3} className='h-96 mb-3' />
                :
                <PostCard postData={data} id={id} />}
        </>
    )
}