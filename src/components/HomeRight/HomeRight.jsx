import React, { useEffect } from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../Redux/Auth/auth.action';
const popularUser=[1,1,1,1];
const HomeRight = () => {
  const {auth} = useSelector(store=>store);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(getAllPostAction())
  // },[post.newComment])

  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  console.log("ashdjgfjasergh--------------",auth)
  return (
    <div className='pr-5'>
      <SearchUser/>

      <Card className='p-5'>
      <div className='flex justify-between py-5 items-center'>
        <p className='font-semibold opacity-70'>Có thể bạn sẽ biết</p>
        <p className='text-xs font-semibold opacity-95'>Xem hết</p>

      </div>

      <div className='space-y-1'>
        {auth.users.filter(user=>user.id !== auth.user.id).map((item)=><PopularUserCard item={item}/>)}
      </div>
      </Card>


    </div>
  )
}

export default HomeRight