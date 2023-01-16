import express, {Request,Response,Application} from 'express'
import qs from 'qs'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

const app:Application = express()
const PORT:Number = 5000

const cache:Array<{timestamp:Number, url:String}> = []

dotenv.config()

app.use(cors())
app.use(express.json())

app.get('/api/memes', async (request:Request, response:Response) => {
    const { data } = await axios.get('https://api.imgflip.com/get_memes');
    return response.json(data);
})

app.get('/api/cache', (request:Request, response:Response) => {
    // creation date descending order
    return response.json(cache)
})

app.post('/api/meme', async (request:Request, response:Response) => {
    const obj:MemePayload = {'template_id':request.body.template_id, 'username':process.env.IMGFLIP_USERNAME, 'password':process.env.IMGFLIP_PASSWORD, 'text0':request.body.text0, 'text1':request.body.text1}
    const { data } = await axios.post('https://api.imgflip.com/caption_image', qs.stringify(obj));
    cache.push({'timestamp':Date.now(), 'url' : data.data.url})
    return response.json(data)
})

app.listen(PORT, ():void => {
    console.log(`Server running on port ${PORT}`)
})

type MemePayload = {
    template_id:String,
    username:String | undefined,
    password:String | undefined,
    text0:String,
    text1:String
}