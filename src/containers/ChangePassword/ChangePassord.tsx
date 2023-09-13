import React from 'react'
import classes from "./ChangePassword.module.css";
import { BackButtom } from 'components/BackButtom/BackButtom';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import PasswordCard from 'components/PasswordCard/PasswordCard';
const ChangePassord = () => {
  return (
    <div className={classes.layout}>
      <div className="container">
        <BackButtom />
        <div className="two mt-5">
          <ProfileCard />
          <PasswordCard />
        </div>
      </div>
    </div>
  )
}

export default ChangePassord