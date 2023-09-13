import React from 'react'
import classes from "./BackButtom.module.css";
import BackIcon from 'containers/Profile/BackIcon';
import { useNavigate } from 'react-router-dom';
export const BackButtom = () => {
  const navigate =useNavigate();
  return (
  
    <div className={classes.Back} onClick={()=> navigate(-1)}>
    <BackIcon />
    <span> Back </span>
  </div>
  )
}
