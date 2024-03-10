import { Avatar, Box } from '@mui/material'
import React from 'react'

const StoryCircle = ({ item }) => {
  return (
    <div className='relative flex flex-col items-center mr-4 cursor-pointer'>
      <div className='flex flex-col items-center mr-4 cursor-pointer'>
        <Avatar
          src={item.avatarImage}
          sx={{ width: "4rem", height: "4rem" }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            right: '25%',
            width: 12,
            height: 12,
            bgcolor: 'green',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center",
          }}
        />
        <p>{item.lastName}</p>
      </div>
    </div>
  )
}

export default StoryCircle