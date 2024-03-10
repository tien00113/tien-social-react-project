import { Card, Grid } from '@mui/material'
import React from 'react'
import Login from './Login'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'

const Authentication = () => {
    return (
        <div>
            <Grid container>
                <Grid className='h-screen overflow-hidden' item xs={7}>
                    <img className='h-full w-full' src="https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-blue-tech-geometric-graphic-party-sign-in-background-material-backgroundgeometryevening-sign-image_73734.jpg" alt="" />
                </Grid>
                <Grid item xs={5}>
                    <div className='px-20 flex flex-col justify-center h-full'>

                        <Card className='card p-8'>
                            <div className='flex flex-col items-center mb-5 space-y-1'>
                                <h1 className='logo text-center'>Tien Nguyen Social</h1>
                                <p className='text-center text-sm w-[70&]'>Kết Nối, Chia Sẻ Trực Tuyến</p>
                            </div>
                            <Routes>
                                <Route path='/' element={<Login/>} />
                                <Route path='/login' element={<Login/>} />
                                <Route path='/register' element={<Register/>} />
                            </Routes>
                        </Card>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Authentication