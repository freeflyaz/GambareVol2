import express from "express";
import cors from "cors"
const app  = express()
const port:number = 8000
app.use(express.json())
app.use(cors());


//

app.listen(port, ()=>{
  console.log(`server listens on ${port}`)
})



