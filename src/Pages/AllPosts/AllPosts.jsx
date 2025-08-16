import axios from 'axios'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostCard from '../../components/Post/PostCard'
import { useQuery } from '@tanstack/react-query'


export default function AllPosts() {
    const { data, isLoading } = useQuery({
        queryFn: getAllPosts,
        queryKey: ['allPosts']
    })

    async function getAllPosts() {
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/posts?sort=-createdAt`, {
                headers: { token: localStorage.getItem('token') }
            })
            return data.posts
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
