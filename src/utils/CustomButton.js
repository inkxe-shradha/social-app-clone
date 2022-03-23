import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

export default function CustomButton({children, onClick, btnClassName, tipClassName, tip}) {
    return (
       <Tooltip title={tip ? tip : ''} className={tipClassName} >
           <IconButton onClick={onClick} className={btnClassName}>
               {children}
           </IconButton>
       </Tooltip>
    )
}
