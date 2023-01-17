import express, {Request,Response,Application} from 'express'
import qs from 'qs'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import { privateEncrypt } from 'crypto'

const app:Application = express()
const PORT:Number = 5000

const cache:Array<{creation_date:Number, url:String}> = []

dotenv.config()

app.use(cors()) // Enable cors 
app.use(express.json())

// GET route to get a list of memes available via the Imgflip API
app.get('/api/memes', async (request:Request, response:Response) => {
    const res_axios:{data:ImgFlipApiMemes} = await axios.get('https://api.imgflip.com/get_memes');
    return response.json(res_axios.data);
})

// GET route to get the list of past memes (order by creation_date DESC)
app.get('/api/cache', (request:Request, response:Response) => {
    return response.json(cache)
})

// POST route to create a new meme
app.post('/api/meme', async (request:Request, response:Response) => {
    const obj:MemePayload = {'template_id':request.body.template_id, 'username':process.env.IMGFLIP_USERNAME, 'password':process.env.IMGFLIP_PASSWORD, 'text0':request.body.text0, 'text1':request.body.text1}
    const res_axios:{data:ImgFlipApiMeme} = await axios.post('https://api.imgflip.com/caption_image', qs.stringify(obj));
    cache.unshift({'creation_date':Date.now(), 'url' : res_axios.data.data.url})
    return response.json(res_axios.data)
})

app.listen(PORT, ():void => {
    console.log(`Server running on port ${PORT}`)
})

// Types Declarations

type MemePayload = {
    template_id:String,
    username:String | undefined,
    password:String | undefined,
    text0:String,
    text1:String
}

type ImgFlipApiMeme = {
    success:Boolean,
    data:{url:String, page_url:String}
}

type ImgFlipApiMemes = {
    success:Boolean,
    data:{memes:Array<Object>}
}