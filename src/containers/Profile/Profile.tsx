import React from 'react'
import classes from "./Profile.module.css";
import BackIcon from './BackIcon';
import { BackButtom } from 'components/BackButtom/BackButtom';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import EditProfile from 'components/EditProfile/EditProfile';
const Profile = () => {
  return (
    <div className={classes.layout } >
      <div className="container">
        <BackButtom />
        <div className={`${classes.container_cards}two mt-5`} >
            <ProfileCard />
            <EditProfile />
        </div>
      </div>
    </div>
  )
}

export default Profile