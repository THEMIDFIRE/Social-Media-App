import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PostCard from './PostCard';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';

export default function PostDetails() {
    const { id } = useParams()

    const {data, isLoading} = useQuery({
        queryFn: getPostDetails,
        queryKey: ['postDetails', id]
    })
    async function getPostDetails() {
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
            <PostCard postData={data}
            />}
        </>
    )
}
