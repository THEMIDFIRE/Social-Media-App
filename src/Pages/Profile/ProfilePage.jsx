import { useQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import { Camera, More } from 'iconsax-reactjs';
import { useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import CreatePost from '../../components/Post/CreatePost';
import PostCard from '../../components/Post/PostCard';
import ServerAPI from '../../components/shared/ServerAPI';
import { userContext } from '../../context/userContext';
import ChangePassword from './ChangePassword';
import UpdatePicture from './UpdatePicture';

export default function ProfilePage() {
    const { userData } = useContext(userContext)
    const { id } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const { data: posts, isLoading } = useQuery({
        queryKey: ['profile', id],
        queryFn: () => getProfile(id),
        select: (data) => data.posts
    });

    async function getProfile(userId) {
        try {
            const { data } = await ServerAPI.get(`/users/${userId}/posts`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex items-end gap-4 mb-4 p-4 rounded shadow-md">
                    <div className='relative cursor-pointer' onClick={() => setIsEditModalOpen(true)}>
                        <img src={userData?.photo} alt={userData?.name} className="rounded-md md:size-36 size-20 shadow-md object-cover" />
                        <Camera className='absolute bottom-1 right-1' />
                    </div>
                    <div className='flex flex-col gap-0.5 grow'>
                        <h1 className='text-2xl font-bold'>{userData?.name}</h1>
                        <p>{userData?.email}</p>
                    </div>
                    <Button className='md:block hidden' size='xs' color='dark' outline onClick={() => setIsPasswordModalOpen(true)}>Change Password</Button>
                    <button className='md:hidden block size-8 self-start'  onClick={() => setIsPasswordModalOpen(true)}>
                        <More />
                    </button>
                </div>
                <CreatePost />
                {isLoading ? <Skeleton count={5} className='h-96 mb-3' /> : posts.slice().reverse().map((post) => (
                    <PostCard key={post._id} postData={post} />
                ))}
            </div>
            <UpdatePicture userData={userData} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
            <ChangePassword isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
        </>
    );
}