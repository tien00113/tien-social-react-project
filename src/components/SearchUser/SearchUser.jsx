import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const {message,auth} = useSelector(store=>store);
  const handleSearchUser = (e) => {
    setUsername(e.target.value)
    console.log("search user.........", auth.searchUser)
    dispatch(searchUser(username))
  }
  const handleClick = (id) => {
    dispatch(createChat({userId:id}))
  }
  return (
    <div>
      <div className='py-5 relative'>
        <input type="text" className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' placeholder='search' onChange={handleSearchUser} />

        {
          username && (
            auth.searchUser.map((item)=><Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
            <CardHeader onClick={() => {
              handleClick(item.id);
              setUsername("");
            }}
              avatar={<Avatar src={item.avatarImage} />}
              title={item.lastName +" "+item.firstName}
              subheader={"@"+ item.firstName.toLowerCase()+"_"+item.lastName.toLowerCase()}
            />
          </Card>)
          )
        }
      </div>
    </div>
  )
}

export default SearchUser