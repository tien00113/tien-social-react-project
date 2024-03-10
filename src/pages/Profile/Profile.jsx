import { Avatar, Box, Button, Card, IconButton, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import ProfileModal from './ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@mui/base';
import MailIcon from '@mui/icons-material/Mail';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { uploadToCloudinary } from '../../utils/uploadToCloudniry';
import { useFormik } from 'formik';
import { updateProfileImageAction } from '../../Redux/Auth/auth.action';
import { api } from '../../config/api';
import { getSavedPostAction } from '../../Redux/Post/post.action';
import { isSavedPostByReqUser } from '../../utils/isSavedPostByReqUser';
const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
// const savedPost = [1, 1, 1];
const Profile = () => {
  // const { id } = useParams();
  const { auth, post } = useSelector(store => store);
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getSavedPostAction(auth.user.id));
  },[post.savedPosts])
  
  const handleImgError = () => {
    setImgError(true);
  };
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState('post');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className='mt-5 flex w-full'>
      <div className='rounded-md w-full'>
        <div className='h-[20rem] relative'>
          <div className='flex absolute right-0 bottom-0 m-5' >
            <IconButton onClick={handleOpenProfileModal}>
              <CameraAltIcon />
            </IconButton>
          </div>
          {imgError ? (
            <div className="w-full h-full rounded-t-md bg-[#eeeeef]" />
          ) : (
            <img
              className='w-full h-full rounded-t-md object-cover'
              src={auth.user.coverImage}
              alt=""
              onError={handleImgError}
            />
          )}

        </div>

        <div className='flex justify-between items-center -translate-y-5'>
          <div className='px-5 flex items-center space-x-3 '>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                className=' transform -translate-y-5 object-cover' sx={{ width: "10rem", height: "10rem" }}
                src={auth.user.avatarImage}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '20%',
                  right: 5,
                  width: 33,
                  height: 33,
                  bgcolor: '#ebedee99',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={handleOpenProfileModal}>
                  <CameraAltIcon />
                </IconButton>
              </Box>
            </Box>
            <div className='items-center'>
              <h1 className='font-bold text-2xl'>{auth.user.lastName.charAt(0).toUpperCase() + auth.user.lastName.slice(1).toLowerCase() + " " + auth.user.firstName.charAt(0).toUpperCase() + auth.user.firstName.slice(1).toLowerCase()}</h1>
              <p className='text-base'>{"@" + auth.user.firstName.toLowerCase() + "_" + auth.user.lastName.toLowerCase()}</p>
            </div>

          </div>
          <div className='pr-5'>
            {true ? <Button onClick={handleOpenProfileModal} sx={{ borderRadius: "10px" }} variant='outlined'>Chỉnh sửa trang cá nhân</Button> : <Button sx={{ borderRadius: "10px" }} variant='outlined'>Follow</Button>}
          </div>
        </div>
        <div className='p-5 -translate-y-10'>
          <div className='flex gap-5 items-center py-3'>
            <span className='font-bold'>{auth.user.followings.length} Followings</span>
            <span className='font-bold'>{auth.user.followers.length} Followers</span>
          </div>
        </div>

        <section className='-translate-y-10'>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs className='w-full justify-between items-center'
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >

              {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}
            </Tabs>
          </Box>

          <div className='flex justify-center'>
            {
              value === "post" ?
                (
                  <div className='space-y-5 w-[70%] my-10'>

                    {post.posts.filter(p=> p.user.id === auth.user.id).map((item => (<div className='border border-slate-100 rounded-md'><PostCard item={item} /></div>)))}

                  </div>
                )

                : value === "reels" ?
                  (
                    <div className='flex justify-center flex-wrap gap-2 my-10'>

                      {reels.map((item) => <UserReelCard />)}

                    </div>
                  )
                  : value === "saved" ?

                    (
                      <div className='space-y-5 w-[70%] my-10'>

                        {post.savedPosts.map((item) => (<div className='border border-slate-100 rounded-md'><PostCard item={item} isSaved={isSavedPostByReqUser(item.id,post.savedPosts)} /></div>))}

                      </div>
                    )

                    : (
                      <div>Repost</div>
                    )
            }
          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile