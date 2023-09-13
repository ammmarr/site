import React , {FC} from 'react'
import classes from "./CurrentCard.module.css";
import Profile from 'images/Profile';
import ShowIcon from 'images/logos/ShowIcon';
import Logo from "../../images/WebusLogo.png";
function tConvert (time:any) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

interface CurrentCardProps {
  total: string;
  seat: string;
  stationFrom:string;
stationTo:string;
timeFrom:string;
timeTo:string
}
const CurrentCard:FC<CurrentCardProps> = ({
    total,
    seat,
    stationFrom,
    stationTo,
    timeFrom,
    timeTo
}) => {
  console.log(tConvert("15:17:00"));
  return (
    <div className={classes.currentCard}>
              <header className={classes.ccardHeading}>
                <img src={Logo} alt='logo'/>
                <div className={classes.Pricing}>
                  <div className={classes.Profile}>
                      <Profile />
                    <span>{seat}</span>
                  </div>
                  <p>{total.split(".")[0]} EGP</p>
                </div>
              </header>
              <main className={classes.ccardDetails}>
                  <div className={classes.detail}>
                    <p>{stationFrom}</p>
                    <span>{tConvert( timeFrom.split(" ")[1])}</span>
                  </div>
                  <div className={classes.detail}>
                    <p> {stationTo} </p>
                    <span>{tConvert( timeTo.split(" ")[1])}</span>
                  </div>
              </main>
              <button className={classes.ccBtn}>
                <ShowIcon />
                <span>View ticket</span>
              </button>
        </div>  
  )
}

export default CurrentCard;