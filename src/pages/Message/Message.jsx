import { Avatar, Backdrop, Card, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import ErrorIcon from '@mui/icons-material/Error';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SearchUser from '../../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../utils/uploadToCloudniry';
import SockJS from 'sockjs-client';
import Stom from 'stompjs'
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const [mess, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/`);
  }
  useEffect(() => {
    dispatch(getAllChats())
  }, [])
  console.log("chat --------", message.chats)
  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("handle select image");

    const imgUrl = await uploadToCloudinary(e.target.files[0], "image")
    setSelectedImage(imgUrl);
    setLoading(false);
  }

  const handleCreateMessage = (value) => {
    const msg = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ msg, sendMessageToServer }));
  };

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:5454/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr);

  }, []);

  const onConnect = () => {
    console.log("websocket connected--------")
  }

  const onErr = (error) => {
    console.log("erorr------------", error);
  }

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`,
        onMessageReice)
    }
  })

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(newMessage))
    }
  }

  const onMessageReice = (payload) => {
    const recivedMessage = JSON.parse(payload.body);
    console.log("message revice from websocket ", recivedMessage);

    setMessages([...mess, recivedMessage])
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mess])

  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid className='px-5' item xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5'>
                <WestIcon onClick={() => handleNavigate()} className='cursor-pointer' />
                <h1 className='text-xl font-bold'>Home</h1>
              </div>

              <div className='h-[83vh]'>
                <div className=''>
                  <SearchUser />
                </div>
                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar'>
                  {
                    message.chats.map((item) => {
                      return <div onClick={() => {
                        setCurrentChat(item)
                        setMessages(item.message)
                      }}>
                        <UserChatCard chat={item} />
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full' item xs={9}>
          {currentChat ? <div>
            <div className='flex justify-between items-center border border-l p-5'>
              <div className='flex items-center space-x-3'>
                <Avatar src={auth.user?.id === currentChat.users[0]?.id ?currentChat.users[1].avatarImage :currentChat.users[0].avatarImage } />
                <p>{auth.user?.id === currentChat.users[0]?.id ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName : currentChat.users[0].firstName + " " + currentChat.users[0].lastName}</p>
              </div>

              <div>
                <div className='flex space-x-3'>
                  <IconButton>
                    <CallIcon />
                  </IconButton>

                  <IconButton>
                    <VideocamIcon />
                  </IconButton>

                  <IconButton>
                    <ErrorIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div ref={chatContainerRef} className='hideScrollBar overflow-y-scroll h-[82vh] px-10 space-y-1 py-12'>
              {mess?.map((item, index) => <ChatMessage key={index} item={item} />)}
              {console.log("messssssssssssssss", mess)}

            </div>
            <div className='sticky bottom-0 border-l'>
              {selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt='' />}
              <div className='py-5 flex items-center justify-center space-x-5'>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleCreateMessage(e.target.value);
                      setSelectedImage("");
                      setInputValue("");
                    }
                  }}
                  className='bg-transparent border border-[#3b40544] rounded-full w-[70%] py-3 px-5'
                  placeholder='Send message'
                  type="text"

                />
                <IconButton className='absolute right-14 top-1/2 transform translate-y-1/6 w-6 h-6'>
                  <SendIcon />
                </IconButton>
                <div>
                  <label htmlFor="image-input">
                    <div className='flex items-center px-5 -translate-x-14'>
                      {/* <PhotoCameraIcon /> */}
                      <InsertPhotoIcon className='cursor-pointer' />
                      <MicIcon className='cursor-pointer'/>
                    </div>
                  </label>
                  <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input' />
                </div>
              </div>
            </div>
          </div> :
            <div className='h-full space-y-5 flex flex-col justify-center items-center'>
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className='text-xl font-semibold'>No Chat Selected</p>
            </div>
          }
        </Grid>

      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Message