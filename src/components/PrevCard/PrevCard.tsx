import React from 'react'
import classes from "./PrevCard.module.css";
import Profile from 'images/Profile';
import ShowIcon from 'images/logos/ShowIcon';
import Logo from "../../images/WebusLogo.png";
import FeedIcon from 'images/logos/FeedIcon';
const PrevCard = () => {
  return (
    <div className={classes.prevCard}>
    <header className={classes.ccardHeading}>
      <img src={Logo} alt='logo'/>
      <div className={classes.Pricing}>
        <div className={classes.Profile}>
            <Profile />
          <span>12</span>
        </div>
        <p>550.00EGP</p>
      </div>
    </header>
    <main className={classes.ccardDetails}>
        <div className={classes.detail}>
          <p>Alexandria ( Mohram Bek station)</p>
          <span>07:30 AM</span>
        </div>
        <div className={classes.detail}>
          <p>Aswan ( Mohram Bek station)</p>
          <span>07:30 AM</span>
        </div>
    </main>
    <div className={classes.btns}>

    <button className={classes.ccBtn}>
      <FeedIcon />
      <span>Feedback</span>
    </button>
    <button className={`${classes.ccBtn} ${classes.active}`}>
      <ShowIcon />
      <span>View ticket</span>
    </button>
    </div>
</div>  
  )
}

export default PrevCard