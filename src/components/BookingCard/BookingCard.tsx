import React , {useEffect, useState} from 'react'
import classes from "./Booking.module.css";
import Logo from "../../images/WebusLogo.png";
import ProfileButtom from 'components/ProfileButtom/ProfileButtom';
import Profile from 'images/Profile';
import ShowIcon from 'images/logos/ShowIcon';
import CurrentCard from 'components/CurrentCard/CurrentCard';
import PrevCard from 'components/PrevCard/PrevCard';
import PendCard from 'components/PendCard/PendCard';
import { useQuery } from 'react-query';
import { toast } from "react-toastify";
import {
	getAddressList,
	listBus,
	listMaritime,
	listPrivates,
	searchTripsMaritime,
} from "api";
import { showApiErrorMessages } from 'utils';
import { useNavigate } from 'react-router-dom';
import EmptyState from 'components/EmptyState/EmptyState';
const BookingCard = () => {
  const navigate = useNavigate();
  const [privates, setPrivates] = useState<any>([]);
  const [addressList, setAddressList] = useState<any>([]);
  const [bus, setBus] = useState<any>([]);
  const [maritimes, setMritimes] = useState<any>([]);
  const [allTrips , setAllTrips] = useState<any>([]);
  const [nav , setNav]= useState<any>("All");
  const { data, isLoading } = useQuery(
		["getTripsMarinTime"],
		() => {
			return listPrivates();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setPrivates([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  const { data: addressListData } = useQuery(
		["addressListData"],
		() => {
			return getAddressList();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setAddressList([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  const { data: busListData } = useQuery(
		["busListData"],
		() => {
			return listBus();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setBus([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  const { data: maritimesListData } = useQuery(
		["maritimeListData"],
		() => {
			return listMaritime();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setMritimes([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  useEffect(()=>{
    setAllTrips([ ...privates , ...addressList , ...bus, ...maritimes])
  } , [])
  if(isLoading){
    <p>Loading</p>
  }
  console.log();
  return (
    <div className={classes.bookingCard}>
        <h2 className={classes.title}>My bookings</h2>
        <ul className={classes.bookingList}>
            <li className={nav==="All" ? classes.active :""} onClick={()=>setNav("All") }>All bookings</li>
            <li className ={nav === "cur"? classes.active : "" } onClick={()=>setNav("cur")}>Current bookings</li>
            <li className={nav === "pend"? classes.active: ""} onClick={()=>{setNav("pend")}}>Pending bookings</li>
            <li className={nav === "prev" ? classes.active : ""} onClick={()=>{setNav("prev")}}>Previous bookings</li>
        </ul>
		{
			nav === "cur" ? <EmptyState /> : ""
		}
		{ nav ==="prev" ? <EmptyState /> : "" }
		{

		}
        {
          nav==="All"?
          bus.map((bu:any)=> <CurrentCard key={bu} total={bu.total} seat={bu.tickets[0].seat_number} stationFrom={bu.station_from.name} stationTo={bu.station_to.name} timeFrom={bu.station_from.arrival_at}
              timeTo={bu.station_to.arrival_at}  /> )
          :""
        }
        {nav === "pend" ? bus.map((bu:any)=> <PendCard key={bu} total={bu.total} seat={bu.tickets[0].seat_number} stationFrom={bu.station_from.name} stationTo={bu.station_to.name} timeFrom={bu.station_from.arrival_at}
              timeTo={bu.station_to.arrival_at}/>)  :" "}
      {/* <EmptyState /> */}
       {/* <PrevCard />
       <PrevCard />
       <PrevCard /> */}
       {/* <PendCard />
       <PendCard />
       <PendCard /> */}
    </div>
  )
}

export default BookingCard