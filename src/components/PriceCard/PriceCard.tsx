import React ,{FC}  from 'react';
import classes from "./PriceCard.module.css";
import TimeLine from 'components/TimeLine/TimeLine';

interface PriceProps {
height:any;
}
const PriceCard: FC<PriceProps> = ({
    height,
}) =>{ 
    return(
        <div className={classes.card}>
                <header className={classes.cardHeader}>
                        <h2>Price</h2>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4708 7.72001C11.6114 7.57956 11.8021 7.50067 12.0008 7.50067C12.1996 7.50067 12.3902 7.57956 12.5308 7.72001L20.0308 15.22C20.1045 15.2887 20.1636 15.3715 20.2046 15.4635C20.2456 15.5555 20.2676 15.6548 20.2694 15.7555C20.2712 15.8562 20.2527 15.9562 20.2149 16.0496C20.1772 16.143 20.1211 16.2278 20.0499 16.299C19.9786 16.3703 19.8938 16.4264 19.8004 16.4641C19.707 16.5019 19.607 16.5204 19.5063 16.5186C19.4056 16.5168 19.3063 16.4948 19.2143 16.4538C19.1223 16.4128 19.0395 16.3537 18.9708 16.28L12.0008 9.31001L5.03082 16.28C4.88865 16.4125 4.7006 16.4846 4.5063 16.4812C4.312 16.4778 4.12661 16.399 3.9892 16.2616C3.85179 16.1242 3.77308 15.9388 3.76965 15.7445C3.76622 15.5502 3.83834 15.3622 3.97082 15.22L11.4708 7.72001Z" fill="#DDE2EB"/>
</svg> 
                     </header>
                    <main className={classes.main}>
                        <div className={classes.prices}>
                            <span>10.000 LE</span>
                            <span>25.000 LE</span>
                        </div>
                        <TimeLine height={true}/>
                    </main>
        </div>
    )
    
}
export default PriceCard;