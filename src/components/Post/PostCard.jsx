import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { BookmarkAdd, ExpandMore } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { createCommentAction, deleteCommentAction, deletePostAction, getAllPostAction, getSavedPostAction, likePostAction, savedPostAction } from '../../Redux/Post/post.action';
import { useDispatch, useSelector } from 'react-redux';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';
import { Button } from '@mui/base';
import { isSavedPostByReqUser } from '../../utils/isSavedPostByReqUser';
import { api } from '../../config/api';

const PostCard = ({ item, isSaved }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const { post } = useSelector(store => store);
    const [showComments, setShowComments] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflown, setIsOverflown] = useState(false);
    const [wasEverOverflown, setWasEverOverflown] = useState(false);
    const [showCardActions, setShowCardActions] = useState(item.liked.length > 0 && item.comments.length > 0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [savedPost, setSavedPost] = useState(isSaved);
    const open = Boolean(anchorEl);
    const textRef = createRef();

    useEffect(() => {
        const checkOverflow = () => {
            const element = textRef.current;
            if (element) {
                const overflown = element.scrollHeight > element.clientHeight;
                setIsOverflown(overflown);
                if (overflown && !wasEverOverflown) {
                    setWasEverOverflown(true);
                }
            }
        };
        window.addEventListener('resize', checkOverflow);
        checkOverflow();
        return () => window.removeEventListener('resize', checkOverflow);
    }, [textRef, wasEverOverflown]);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleShowComment = () => {
        setShowComments(!showComments);
        setShowCardActions(true);
    };

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData));

    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.id));
        setShowCardActions(true);

    }

    const handleDeleteComment = (commentId) => {
        console.log("id cmt trc comment id xoa.", commentId)
        dispatch(deleteCommentAction(item.id, commentId));
        handleClose();
    }

    const handleDeletePost = () => {
        dispatch(deletePostAction(item.id));
        window.location.reload();
    }

    const handleSavedPost = () => {
        dispatch(savedPostAction(item.id));
        setSavedPost(!savedPost);
    }
    useEffect(() => {
        dispatch(getSavedPostAction(auth.user.id));
    }, [])

    useEffect(() => {
        setSavedPost(isSavedPostByReqUser(item.id, post.savedPosts));
    }, [post.savedPosts])

    return (
        <Card className='w-full'>
            <CardHeader
                avatar={
                    <Avatar src={item.user.avatarImage} aria-label="recipe">
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton onClick={handleClick2} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
                            <MenuItem onClick={handleDeletePost}>Xóa</MenuItem>
                        </Menu>
                    </div>
                }
                title={item.user.lastName + " " + item.user.firstName}
                subheader={"@" + item.user.firstName.toLowerCase() + "." + item.user.lastName.toLowerCase()}
            />
            <CardContent className='w-full overflow-hidden overflow-ellipsis font-semibold'>
                <Typography variant="body" color="text.secondary">
                    <p className={`px-2 overflow-hidden overflow-ellipsis ${isExpanded ? '' : 'line-clamp-3'}`} ref={textRef}>{item.caption}</p>
                    {wasEverOverflown && (<button
                        className="text-blue-500 px-2"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>)}
                </Typography>

            </CardContent>
            {item.image && <CardMedia
                className='w-full h-128 overflow-hidden'
                component="img"
                // height="128"
                image={item?.image}
                alt=""
            />}
            {showCardActions ? <CardActions className='flex flex-col justify-between border-b-2 border-gray-300 mx-3'>
                <div className='w-full px-2 mt-2'>
                    <div className='flex justify-between'>
                        {item.liked.length !== 0 && <p><FavoriteIcon sx={{ fontSize: "1.3rem" }} color='error' /> {item.liked.length}</p>}
                        {item.comments.length !== 0 && <p className='cursor-pointer' onClick={handleShowComment}>{item.comments.length} bình luận</p>}
                    </div>
                </div>
            </CardActions> : <div className='border-t-2 border-gray-300 mt-3 mx-3'></div>}
            <CardActions className='flex justify-between mx-14' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <span className='font-medium'>Thích</span>
                    {/* <IconButton>
                        {<ShareIcon />}
                    </IconButton> */}
                </div>
                <div>
                    <IconButton onClick={handleShowComment}>
                        {<ChatBubbleOutlineIcon />}
                    </IconButton>
                    <span className='font-medium'>Bình luận</span>
                </div>
                <div>
                    <IconButton onClick={handleSavedPost}>
                        {savedPost ? <BookmarkIcon color='primary' /> : <BookmarkBorderIcon />}
                    </IconButton>
                    <span className='font-medium'>Lưu</span>
                </div>
            </CardActions>

            {showComments && <section>
                <CardContent className='flex flex-col items-start mx-2 space-y-2 text-xs border-t-2'>
                    {item.comments?.map((comment => <div key={comment.id} className='flex space-x-2 px-3'>
                        <Avatar sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }} src={comment.user.avatarImage} />
                        <div>
                            <div className='flex flex-col bg-gray-200 rounded-xl p-2 -translate-y-1'>
                                <p className='font-bold'>{comment.user.lastName + " " + comment.user.firstName}</p>
                                <p className='text-sm'>{comment.content}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='flex font-semibold px-4 items-center cursor-pointer'>Thích</p>
                                <p className='flex font-semibold items-center cursor-pointer'>Trả lời</p>
                                <div>
                                    <Button onClick={handleClick} aria-label="settings">
                                        <MoreHorizIcon className='px-1 mx-3 cursor-pointer' />
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
                                        {console.log("comment id truoc khi xoa----", comment.id)}
                                        <MenuItem onClick={() => handleDeleteComment(comment.id)}>Xóa</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>))}
                </CardContent>
                <div className='flex items-center space-x-5 mx-3 my-5'>
                    <Avatar src={item.user.avatarImage} />
                    <input onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleCreateComment(e.target.value)
                            console.log("noi dung nhan enter: ", e.target.value)
                        }
                    }}
                        className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
                        placeholder='Viết bình luận...'
                        type="text"
                    />
                </div>

            </section>}

        </Card>

    )
}

export default PostCard
