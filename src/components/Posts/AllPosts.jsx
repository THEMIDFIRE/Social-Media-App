import axios from 'axios'
import { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'

export default function AllPosts() {


    const [allPosts, setAllPosts] = useState([])

    async function getAllPosts() {
        try {
            const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/posts?sort=-createdAt`, {
                headers: { token: localStorage.getItem('token') }
            })

            setAllPosts(data.posts)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])


    return (
        <>
            {allPosts.map((post) => <PostCard postData={post} key={post._id} />)}
        </>
    )
}
