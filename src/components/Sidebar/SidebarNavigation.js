import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const navigationMenu = [
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/",
        name:"Trang chủ"
    },
    {
        title:"Reels",
        icon:<ExploreIcon/>,
        path:"/reels",
        name:"Thước phim"
    },
    {
        title:"Create Reels",
        icon:<ControlPointIcon/>,
        path:"/create-reels",
        name:"Tạo thước phim"
    },
    {
        title:"Notifications",
        icon:<NotificationsIcon/>,
        path:"/",
        name:"Thông báo"
    },
    {
        title:"Message",
        icon:<MessageIcon />,
        path:"/message",
        name:"Tin nhắn"
    },
    {
        title:"List",
        icon:<ListAltIcon/>,
        path:"/",
        name:"Danh sách"
    },
    {
        title:"Communities",
        icon:<GroupIcon/>,
        path:"/",
        name:"Nhóm"
    },
    
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile",
        name:"Trang cá nhân"
    },
    
]