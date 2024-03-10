import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MiddlePart from '../../components/MiddlePart/MiddlePart'
import CreateReels from '../../components/Reels/CreateReels'
import Reels from '../../components/Reels/Reels'
import Profile from '../Profile/Profile'
import HomeRight from '../../components/HomeRight/HomeRight'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/auth.action'

const HomePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store=>store);

    console.log("auth", auth);
    console.log("jwt", jwt);

  return (
    <div className='px-20'>
        <Grid container spacing={0}>
            <Grid item xs={0} lg={3}>

                <div className='sticky top-0'>
                    <Sidebar/>
                </div>

            </Grid>

            <Grid item xs={location.pathname==='/profile' ? 9:6} className='px-5 flex justify-center'>
                <Routes>
                    <Route path='/' element={<MiddlePart/>}/>
                    <Route path='/reels' element={<Reels/>}/>
                    <Route path='/create-reels' element={<CreateReels/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </Grid>

            <Grid item lg={3} className={`${location.pathname==='/profile' ? "hidden":"relative"}`}>
                <div className='sticky top-0 w-full'>
                    <HomeRight/>
                </div>
            </Grid>

        </Grid>

    </div>
  )
}

export default HomePage