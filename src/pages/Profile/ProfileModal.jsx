import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction, updateProfileImageAction } from '../../Redux/Auth/auth.action';
import { Avatar, Backdrop, CircularProgress, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { uploadToCloudinary } from '../../utils/uploadToCloudniry';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    outline: "none",
    overFlow: "scroll-y",
    borderRadius: 3,
};

export default function ProfileModal({ open, handleClose }) {

    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log("values ", values)
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: ""
        },
        onSubmit: (values,) => {
            console.log("values ", values)
            dispatch(updateProfileAction(values))
        },
    });
    const imgformik = useFormik({
        initialValues: {
            avatarImage: auth.user.avatarImage,
            coverImage: auth.user.coverImage
        },
        onSubmit: (values,) => {
            console.log("image user values", values);
            dispatch(updateProfileImageAction(values))
        }
    })

    const [userValues, setUserValues] = useState({
        avatarImage: auth.user.avatarImage,
        coverImage: auth.user.coverImage,
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
    });
    const handleChange = (event) => {
        setUserValues({
            ...userValues,
            [event.target.name]: event.target.value,
        });
        // dispatch(updateProfileImageAction(userValues));
    };

    useEffect(() => {
        dispatch(updateProfileImageAction(userValues));
    }, [userValues, dispatch]);

    const [selectedImage, setSelectedImage] = useState(userValues.avatarImage);
    const [selectedCoverImage, setSelectedCoverImage] = useState(userValues.coverImage);
    const [isLoading, setIsLoading] = useState(false);
    const handleSelectAvatarImage = async (event) => {
        if (event.target.files[0]) {
            setIsLoading(true);
            const imageUrl = await uploadToCloudinary(event.target.files
            [0], "image")

            imgformik.setFieldValue("avatarImage", imageUrl);
            setIsLoading(false);

            const objectUrl = URL.createObjectURL(event.target.files[0]);
            setSelectedImage(objectUrl);
        }
    };
    const handleSelectCoverImage = async (event) => {
        if (event.target.files[0]) {
            setIsLoading(true);
            const imageUrl = await uploadToCloudinary(event.target.files
            [0], "image")
            // setSelectedCoverImage(imageUrl);       
            imgformik.setFieldValue("coverImage", imageUrl);
            setIsLoading(false);

            const objectUrl = URL.createObjectURL(event.target.files[0]);
            setSelectedCoverImage(objectUrl);
        }
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        imgformik.handleSubmit();
                        handleClose();
                    }
                    }>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>

                            </div>
                            <p className='font-bold'>Chỉnh sửa thông tin</p>
                            <Button type='submit'>Lưu</Button>
                        </div>

                        <div className="relative w-full h-[10rem] flex items-center justify-center">
                            <Avatar sx={{ height: "5rem", width: "5rem" }} alt="User Name" src={selectedImage} className="mx-auto" />

                            <div className="absolute top-0 left-0 ml-4 mt-4">
                                <span className="text-lg font-bold">Ảnh đại diện</span>
                            </div>

                            <div className="absolute top-0 right-0 mr-4 mt-4">
                                <input type="file" accept='image/*' onChange={handleSelectAvatarImage} style={{ display: "none" }} id='avatarimage-input' />
                                <label htmlFor="avatarimage-input">
                                    <p style={{ color: "#5aa7ff" }} className='cursor-pointer'>Thêm</p>
                                </label>
                            </div>
                        </div>
                        <div className="relative w-full h-[10rem] flex items-center justify-center">



                            <img className='h-[8rem] p-2' src={selectedCoverImage} alt="" />


                            <div className="absolute top-0 left-0 ml-4 mt-4">
                                <span className="text-lg font-bold">Ảnh bìa</span>
                            </div>

                            <div className="absolute top-0 right-0 mr-4 mt-4">
                                <input type="file" accept='image/*' onChange={handleSelectCoverImage} style={{ display: "none" }} id='coverimage-input' />
                                <label htmlFor="coverimage-input">
                                    <p style={{ color: "#5aa7ff" }} className='cursor-pointer'>Thêm</p>
                                </label>
                            </div>
                        </div>
                        <div className='space-y-3'>
                            <TextField
                                fullWidth
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                value={userValues.firstName}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                id='lastName'
                                name='lastName'
                                label='Last Name'
                                value={userValues.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    );
}