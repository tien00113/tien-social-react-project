import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

const BadgeOverlap = ({icons}) =>{
  return (
    // <Stack spacing={3} direction="row">
      <Badge color='error' badgeContent="4">
        {icons}
      </Badge>
    //   {/* <Badge color="secondary" badgeContent=" " variant="dot">
    //     {rectangle}
    //   </Badge>
    //   <Badge color="secondary" overlap="circular" badgeContent=" ">
    //     {circle}
    //   </Badge>
    //   <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
    //     {circle}
    //   </Badge> */}
    // </Stack>
  );
}
export default BadgeOverlap