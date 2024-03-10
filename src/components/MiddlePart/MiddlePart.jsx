import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';
import { getAllUser } from '../../Redux/Auth/auth.action';
const story = [11, 1, 1, 1, 1];
const MiddlePart = () => {
  const dispatch = useDispatch();
  const { post, auth } = useSelector(store => store);
  const [posts, setPosts] = useState([]);
  
  console.log("post store", post);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const handleopenCreatePostModal = () => setOpenCreatePostModal(true);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

  useEffect(() => {
    dispatch(getAllPostAction())
  }, [post.newComment])

  useEffect(() => {
    dispatch(getAllUser())
  }, [])

  return (
    <div className='w-full'>
      <section className='flex items-center p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>

          <p>New</p>
        </div>
        {auth.users.filter(user => user.id !== auth.user.id).map((item) => <StoryCircle item={item} />)}
      </section>
      <Card className='p-5 mt-5'>
        <div className='flex justify-between'>
          <Avatar src={auth.user.avatarImage} />
          <input
            onClick={handleopenCreatePostModal}
            readOnly
            placeholder='Bạn đang nghĩ gì...'
            type="text"
            className='outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border-[#3b4054] border'
          />
        </div>
        <div className='flex justify-between items-center mt-5 px-3'>
          <div className='w-1/3 flex items-center justify-center'>
            <IconButton color='primary' onClick={handleopenCreatePostModal}>
              <ImageIcon />
            </IconButton>

            <span>Ảnh</span>

          </div>
          <div className='w-1/3 flex items-center justify-center'>
            <IconButton color='primary' onClick={handleopenCreatePostModal}>
              <VideocamIcon />
            </IconButton>

            <span>Video</span>

          </div>
          <div className='w-1/3 flex items-center justify-center'>
            <IconButton color='primary' onClick={handleopenCreatePostModal}>
              <ArticleIcon />
            </IconButton>

            <span>Hoạt Động</span>

          </div>

        </div>
      </Card>

      <div className='mt-5 space-y-5 w-full'>
        {post.posts.map((item) => <PostCard item={item} />)}
      </div>

      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal} />
      </div>
    </div>
  )
}

export default MiddlePart