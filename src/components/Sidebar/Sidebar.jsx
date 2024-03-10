import React, { useEffect } from 'react'
import { navigationMenu } from './SidebarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BadgeOverlap from './BadgeOverlap';
import { logoutUserAction } from '../../Redux/Auth/auth.action';
const Sidebar = () => {
  const {auth} = useSelector(store=>store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigate = (item) =>{
    if (item.title==="Profile") {
      navigate(`/profile`)
    }
    if (item.title==="Message") {
      navigate(`/message`)
    }
    if (item.title==="Home") {
      navigate(`/`)
    }
    if (item.title==="Reels") {
      navigate(`/reels`)
    }
    if (item.title==="Create Reels") {
      navigate(`/create-reels`)
    }
    if (item.title==="Notifications") {
      navigate(`/notifications`)
    }
  };
  const isLoggedIn = useSelector(state => state.isLoggedIn);
//   useEffect(() => {
//     if (!isLoggedIn) {
//         navigate(`/`);
//     }
// }, [isLoggedIn, navigate]);
  const handleLogout = ()=>{
    dispatch(logoutUserAction());
    localStorage.removeItem("jwt");
    navigate(`/`);
    window.location.reload();
    console.log("logout success");
  }
  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className='space-y-8 pl-5'>
        <div className=''>
          <span className='logo font-bold text-xl'>T-Social</span>
        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item) => (
            <div onClick={()=>handleNavigate(item)} className='cursor-pointer flex space-x-3 items-center'>
              
              {item.title==="Message" || item.title==="Notifications"? <BadgeOverlap icons={item.icon}/> : item.icon}
              <p className='text-xl'>
                {item.name}
              </p>
              
            </div>
            
          ))}
        </div>
      </div>

      <div>
        <Divider />
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>
            <Avatar src={auth.user.avatarImage} />
            <div>
              <p className='font-bold'>{auth.user?.lastName+" "+auth.user?.firstName}</p>
              <p className='opacity-70'>@{auth.user?.firstName.toLowerCase() +"_"+ auth.user?.lastName.toLowerCase()}</p>
            </div>
          </div>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar