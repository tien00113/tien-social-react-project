import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import moment from 'moment';
const UserChatCard = ({ chat }) => {
  const { message, auth } = useSelector(store => store);
  console.log("test chat xong xoa    ", message.chats)
  const DisplayTime = ({ timestamp }) => {
    const now = moment();
    const time = moment(timestamp);
    const difference = now.diff(time, 'days');

    let displayTime;
    if (difference < 1) {
      displayTime = time.format('HH:mm');
    } else {
      displayTime = time.format('DD/MM');
    }
    return displayTime;
  }

  console.log("chat cua tao day ne", chat)
  
  return (
    <Card>
      <CardHeader className='cursor-pointer'
        title={auth.user?.id === chat.users[0].id ? chat.users[1].firstName + " " + chat.users[1].lastName : chat.users[0].firstName + " " + chat.users[0].lastName}
        subheader={<div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px'
        }}>
          {chat?.message[chat?.message.length - 1]?.content}
        </div>}
        action={
          <div>
            <IconButton><MoreHorizIcon /></IconButton>
            <p className='text-sm'>{DisplayTime({ timestamp: chat?.message[chat?.message.length - 1]?.timestamp })}</p>
          </div>
        }
        avatar={<Avatar sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem" }} src={auth.user?.id === chat.users[0].id ? chat.users[1].avatarImage : chat.users[0].avatarImage} />}>

      </CardHeader>
    </Card>
  )
}

export default UserChatCard