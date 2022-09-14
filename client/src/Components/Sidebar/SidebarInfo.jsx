import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';

export const SidebarInfo = [
    {
        icon: <HomeIcon/>,
        linkTo: "/",
    },
    {
        icon: <FormatListBulletedIcon/>,
        linkTo: "/portfolios",
    },
    {
        icon: <InfoIcon/>,
        linkTo: "/addstock",
    }
]