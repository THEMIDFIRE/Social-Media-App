import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostCard from '../../components/Post/PostCard'


export default function AllPosts() {
    const { data, isLoading } = useQuery({
        queryFn: getAllPosts,
        queryKey: ['allPosts'],
        select: (data) => data.posts
    })

    async function getAllPosts() {
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/posts?sort=-createdAt`, {
                headers: { token: localStorage.getItem('token') }
            })
            return data
        } catch (error) {
            return error
        }
    }


    return (
        <>
            {!isLoading &&
                data?.map((post) => <PostCard postData={post} key={post._id} />) || <Skeleton count={5} className='h-96 mb-3' />}
        </>
    )
}
