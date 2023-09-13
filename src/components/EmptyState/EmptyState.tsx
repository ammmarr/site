import React from 'react'
import classes from "./Emptystate.module.css";
import EmpState from "../../images/empty state.png";
import ProfileButtom from 'components/ProfileButtom/ProfileButtom';
const EmptyState = () => {
  return (
    <>
    <div className={classes.EmptyState}>
         <img src={EmpState} alt='emptyState'/>
            <h3>You currently have no bookings. </h3>
    </div>
    {/* <ProfileButtom title='Search & Compare' mt={false}/ > */}
    </>
  )
}

export default EmptyState