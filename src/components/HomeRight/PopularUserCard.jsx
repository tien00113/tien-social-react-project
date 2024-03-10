import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../Redux/Auth/auth.action';
import { FollowUser } from '../../utils/FollowUser';

const PopularUserCard = ({ item }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const [isFollowing, setIsFollowing] = useState(FollowUser(auth.user,item));

  const handleFollow = () => {
    dispatch(followUser(item.id))
    setIsFollowing(!isFollowing);
    console.log("done")
  }
  return (
    <div>
      {<CardHeader
        avatar={
          <Avatar src={item.avatarImage} aria-label="recipe">
          </Avatar>
        }
        action={
          <Button size='small'
            onClick={handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        }
        title={item.lastName + " " + item.firstName}
      >
      </CardHeader>}
    </div>
  )
}

export default PopularUserCard