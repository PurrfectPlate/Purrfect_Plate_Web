'use client'

import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { ScrollArea ,ScrollBar } from "@/components/ui/scroll-area"
import { Avatar } from '@mui/material';
import { db } from '../firebase';
import { onSnapshot, query, where, collection } from 'firebase/firestore';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"





  







function NotificationList() {

    const [isClient, setIsclient] = useState(false);
    const [notifications, setNotifications] = useState([]);


    useEffect(()=>{
       setIsclient(true);
    },[])


    
    useEffect(()=>{
        const q = query(collection(db, "Notifications"), where("type", "==", "User"));
        onSnapshot(q, (querySnapshot) => {
       const dt = [];
       querySnapshot.forEach((doc) => {
           dt.push({data:doc.data(), id:doc.id});
       });
       dt.sort((a,b) => b.data.createdAt - a.data.createdAt);
       setNotifications(dt);
       });

     
    },[])

    if(!isClient) return;
 



  return (
    <Card className="w-full h-[700px]">
    <CardHeader>
     <CardTitle>List of Notifications</CardTitle>
     <CardDescription>See the list of notification here.</CardDescription>
    </CardHeader>

    <CardContent className='h-full '> 
      <ScrollArea className='flex flex-col space-y-2 gap-2 h-[550px] p-3 border rounded-sm w-full '>
      <ScrollBar orientation="horizontal" />
        {notifications && notifications.map((d, i)=> {
            return (
                
        <div className={`flex  justify-between items-center border gap-9 mb-2 p-3 w-full rounded-md max-md:flex-col ${!d.data.hasSeen ? "border-[#FAB1A0]": " opacity-50"} `}>
        <div className='flex justify-center items-center gap-4 '>
        <div className={`border p-1 rounded-full ${!d.data.hasSeen && "border-[#FAB1A0]"}  relative `}>
    <Avatar
alt="Remy Sharp"
src={d.data.image ||"/Image/anyaCuttie.jpg"}
sx={{ width: 50, height: 50 }}
/>      
    </div>
        <div className='flex flex-col justify-center'>
            <span className={`font-bold max-md:text-[15px] ${!d.data.hasSeen && "text-[#FAB1A0]"}`}>{d.data.User}</span>
            <span className={`text-sm opacity-60 max-md:text-[13px] ${!d.data.hasSeen && "text-[#FAB1A0]"}`}>{d.data.Messages} </span>
        </div>
        </div>
     
        <div className='text-[10px] opacity-70 max-md:self-end max-md:text-[12px] text-red-500 font-bold'>
           {moment(d.data.createdAt.toDate()).calendar()}
        </div>
    </div>

            )
        })}       
        
        </ScrollArea>
    </CardContent>
 
    </Card>
  )
}

export default NotificationList