"use client"
import React, { useMemo, useState } from 'react';
import io from 'socket.io-client';

const Page = () => {
  const [details,setDetails] = useState({
    name:"",
    msg:""
  })
  const [msg,setMsg] = useState([{
    name:"",
    msg:""
  }])
  const socket = useMemo(() => io("http://localhost:3002"), []);
  socket.on("msg",(newmsg:{name:string,msg:string})=>{
    setMsg(prevMsg => [...msg, newmsg]);
  })

  // Your component JSX
  return (
    <div>
      <input type="text" name="" id="" className='p-2' onChange={(e)=>{
        setDetails({
          ...details,name:e.target.value
        })
      }}/><br />
      <input type="text" name="" id="" className='p-2'onChange={(e)=>{
        setDetails({
          ...details,msg:e.target.value
        })
      }}/><br />
      <button onClick={()=>{
        socket.emit("click",details)
      }}>click</button>
      {
        msg.map((ms)=>{
          return <div key={ms.name}>
              {ms.name}:  {ms.msg}
          </div>
        })
      }
      
    </div>
  );
}

export default Page;
