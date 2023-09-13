import React ,{FC}  from 'react';
import classes from "./TimeLine.module.css";

interface TimeLineProps {
height:any;
}

const TimeLine: FC<TimeLineProps> = ({
    height,
}) =>{
    return<>
    <section className={classes.main}>
    <span></span>
    <span></span>
    {height &&<span></span>}
    <span></span>
<div className={classes.btns}>
    <button className={classes.btnLeft}> {" "}</button>
    <button className={classes.btnRight}>{" "}</button>
</div>
    </section>
    </>
}
export default TimeLine;