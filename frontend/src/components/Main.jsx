import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Editor from '@monaco-editor/react'
import axios from "axios";
const Main=()=>{
    
// const getfull=async()=>{
//    const res= await  axios.get('http://localhost:5000/getfull')
//    console.log('getting full')
//         sethints(res.data.r)
// }

   const [input, setInput] = useState('');
  const [stopTyping, setStopTyping] = useState(false);
    const [hint,sethints]=useState([])

    const  q=useRef('')
   
    const inputref=useRef()
    const navigate=useNavigate()
    const [st,setst]=useState(false)
useEffect(()=>{
    const timer= setTimeout(() => {
      setStopTyping(true)
        


    }, 1000);



    return ()=>{
        clearTimeout(timer)
        setStopTyping(false)
    }
},[input])

useEffect(()=>{
    
    const func=async()=>{
         console.log("functino to genereate hint is callled")
    //call the function to generate the answers append to existing answers and give the output 
    const response= await axios.post('http://localhost:5000/gethint',{i:JSON.stringify(input)})
    sethints((prev)=>[...prev,response.data.resp])
    console.log(response.data.resp)
    }
    if (stopTyping && input.trim()!='' ){
       
        func()
    }
},[stopTyping])

    return (
<motion.div
    

 className="w-screen h-screen bg-gray-800 flex justify-center items-center p-10">
{!st &&(
    <div className="w-200 h-100 bg-white rounded-sm p-2 flex flex-col justify-around items-center">
<motion.h1
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:2,delay:0.25 }}
    className="font-mono text-2xl"
>Ai</motion.h1>
<motion.input  
ref={inputref}
initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.25,delay:1 }}
    className="w-[70%] h-10 bg-gray-500 rounded-sm placeholder:p-2 p-2"
   
onKeyDown={(e)=>{


    
    if(e.key==='Enter' && !st) {
    console.log("enter pressewd")
    setst(true)
    q.current=e.target.value
    console.log(e.target.value)
    // navigate('/deltres')
     console.log("called to get the answer")
    axios.post('http://localhost:5000/init',{ques:JSON.stringify(e.target.value)})
    
    
}}
}
/>
    
</div>)}
{st && (
    <motion.div 
initial={{ opacity:0 }}
animate={{ opacity:1 }}
transition={{ duration:1 }}
className=" w-full h-full flex flex-row gap-1 justify-around ">
    <motion.div className="w-[50%] bg-gray-700 rounded-sm p-2" >
    <Editor 
    height='100%'
    width="100%"
    theme="vs-dark"

value={input}
    onChange={(value)=>setInput(value)
    }
     defaultLanguage="python" />

     </motion.div>
   <motion.div className="w-[50%] bg-gray-900 rounded-sm p-5 font-mono flex  flex-col gap-1 ">
 <div className="flex-1  overflow-auto flex flex-col gap-1"> {hint.length > 0 && (
    <>
      {hint.map((value, ind) => {
  return (
    <p key={ind} className=" text-white">
      {JSON.parse(value)}
    </p>
  );
})}

    </>
  )}</div>
 <div className="w-full border-1 border-white rounded-sm h-20 flex flex-row justify-around items-center">
    <motion.button whileHover={{ backgroundColor:'white',color:'black' }}
    transition={{ duration:0.5 }} className="text-white hover:cursor-pointer p-2 rounded-sm"> Stop Hints</motion.button>
     <motion.button whileHover={{ backgroundColor:'white',color:'black' }}
    transition={{ duration:0.5 }} className="text-white hover:cursor-pointer p-2 rounded-sm" onClick={()=>{
    //   getfull()
    }}> Show Answer</motion.button>
 </div>
</motion.div>
</motion.div>)}
    
</motion.div>


    )

}
export default Main

