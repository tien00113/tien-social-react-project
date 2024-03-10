import { Modal } from '@mui/base'
import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CloseIcon from '@mui/icons-material/Close';
import { uploadToCloudinary } from '../../utils/uploadToCloudniry';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, createPostAction } from '../../Redux/Post/post.action';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "0.6rem",
  outline: "none",

};

const CreatePostModal = ({ open, handleClose }) => {

  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {auth} = useSelector(store=>store);
  const dispatch = useDispatch();
  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files
    [0], "image")
    setSelectedImage(imageUrl);
    setIsLoading(false)
    formik.setFieldValue("image", imageUrl)
  };
  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files
    [0], "video")
    setSelectedVideo(videoUrl);
    setIsLoading(false)
    formik.setFieldValue("video", videoUrl)
  };

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: ""
    },
    onSubmit: (values) => {
      console.log("formik values ", values);
      dispatch(createPostAction(values));
      setIsPostModalOpen(false);
    }
  });



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {<Box sx={style} className="pb-5 pl-5">
      <div className='flex flex-row justify-end items-start'>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        <form onSubmit={(e)=>
          {
            e.preventDefault();
            formik.handleSubmit();
            handleClose();
        }}>
          <div>
            <div className='flex space-x-4 items-center'>

              <Avatar src={auth.user.avatarImage}/>
              <div>
                <p className='font-bold text-lg'>{auth.user.lastName+" "+auth.user.firstName}</p>
                <p className='text-sm'>{"@"+auth.user.firstName+" "+auth.user.lastName}</p>
              </div>
            </div>
            <textarea className='outline-none w-[90%] mt-5 p-3 bg-transparent rounded-sm' placeholder='Bạn đang nghĩ gì ...' name="caption" id="" onChange={formik.handleChange} value={formik.values.caption} rows="4"></textarea>
            {
              selectedImage &&
              <div className='flex items-center justify-center'>
                <div className='flex justify-center items-center w-[50%] bg-black'>
                  <img className='h-[auto] justify-center items-center' src={selectedImage} alt="" />
                </div>               
              </div>
            }
            <div className='flex space-x-5 items-center mt-5'>
              <div>
                <input type="file" accept='image/*' onChange={handleSelectImage} style={{ display: "none" }} id='image-input' />
                <label htmlFor="image-input">
                  <IconButton color='primary' component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>
              <div>
                <input type="file" accept='video/*' onChange={handleSelectVideo} style={{ display: "none" }} id='video-input' />
                <label htmlFor="video-input">
                  <IconButton color='primary' component="span">
                    <VideoCallIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>
            
            <div className='flex w-full justify-end px-5'>
              <Button variant='contained' type='submit' sx={{ borderRadius: "1.5rem" }}>Post</Button>
            </div>
          </div>
        </form>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>}
    </Modal>
  )
}

export default CreatePostModal