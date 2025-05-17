const express = require('express');
const app=express()

const dotenv = require('dotenv');
const cors = require('cors');

const t=dotenv.config().parsed
const ai = require('@google/generative-ai');
const { Chat } = require('openai/resources/index.mjs');
app.use(cors())
app.use(express.json());
const genAI=new ai.GoogleGenerativeAI(t.API_KEY)

async function run(prop) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history:[
      {
        role:'user',
        parts:[{text:'ok im a noob user'}]
      }

      ,
      {
        role:'model',
        parts:[{text:"hii"}]
      }
    ]
  })
  return chat
  
}
let chat;
let answer;

app.post('/init',async(req,res)=>{
  
  chat=await run()
  
  console.log(JSON.parse(req.body.ques))
  await chat.sendMessage(`You are an expert coding assistant. Based on the user's problem, generate a clear, step-by-step solution outline that leads to the final correct answer. This outline will be the reference for all future hints and checks. Only produce this once as the initial solution plan.
 ${req.body.ques} from next input onwards just do the following , Check if the user's current approach aligns with the initial solution outline.
- If it aligns, respond with a very very short, single-line hint or nudge to help them think further.
- If it deviates, point out the issue in strictly one clear line and suggest a direction only if user make wrong entry again and it should be such a way that without giving the solution.
- Do not generate full explanations or answers.
- Be concise, hint-based, and thought-provoking.

-dont responde (dont give any answer if user enters some text which is not recognized by any coding language)
`).then(res=>{
  // console.log('answer is generated',res.response.text())
  answer=JSON.stringify(res.response.text())
  console.log(answer)

 })
 
  console.log('Chat is initialized and ready to generate answers')
})
let hint;
app.post('/gethint',async(req,res)=>{
  console.log("getting hint")
  console.log(JSON.parse(req.body.i))

 const result= await chat.sendMessage(`The user’s current approach is: ${req.body.i}

 `)
hint=result.response.text()

console.log(hint)
res.send({resp:JSON.stringify(hint)})
})


app.get('/getfull',(req,res)=>
  res.send({r:answer})
)

app.listen(5000,()=>{console.log("listening to port 5000")})