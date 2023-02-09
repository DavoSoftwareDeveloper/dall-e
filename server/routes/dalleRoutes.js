import  express  from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi( configuration )



router.route("/").get((req, res ) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async(req, res) => {
    try {
        const { prompt, n } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        console.log("dalle route")
    const image = aiResponse.data.data[0] ? aiResponse.data.data[0].b64_json : null
    const image2 = aiResponse.data.data[1] ? aiResponse.data.data[1].b64_json : null
    const image3 = aiResponse.data.data[2] ? aiResponse.data.data[2].b64_json : null
    const image4 = aiResponse.data.data[3] ? aiResponse.data.data[3].b64_json : null
    const image5 = aiResponse.data.data[4] ? aiResponse.data.data[4].b64_json : null
    const image6 = aiResponse.data.data[5] ? aiResponse.data.data[5].b64_json : null

    res.status(200).json({ photo: [ image, image2, image3, image4, image5, image6 ] });


    } catch (error){ 
        console.error(error)
        res.status(500).send(error?.response.data.error.message)
    }
});

export default router;