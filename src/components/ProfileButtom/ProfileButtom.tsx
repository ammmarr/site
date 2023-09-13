import React , { FC}from 'react'
import classes from "./ProfileButtom.module.css";

interface ProfileButtomProps{
    title: string;
    mt:boolean;
    onClick: ()=>void

}
const ProfileButtom :FC<ProfileButtomProps> = ({
    title,
    mt,
    onClick
  
}) => {

    if(mt){
      return (
        <button className={`${classes.EditBtn} mt-96`}>
        {title}
    </button>
      )
    }
    
  return (
    <button className={classes.Edit} onClick={onClick}>
    {title}
</button>
  )
}

export default ProfileButtom