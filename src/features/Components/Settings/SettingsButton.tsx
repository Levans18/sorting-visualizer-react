import  { IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import $ from 'jquery';
 
export function SettingsButton(){

    const [open, setOpen] = useState(false);
    function toggleSettings(){
        setOpen(!open);
        if(open){
            console.log("should be working");
        }else{
            console.log("doesn't work");
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton className="setting-button" aria-label="Settings" size="small" color="info" onClick={toggleSettings}>
                <SettingsIcon className="settings-button-icon" fontSize="large" sx={{color: "white"}}/>
            </IconButton>
        </Stack>
    );
}