const axios = require("axios")
const Dev = require("../models/Dev.js");

const parseStringAsArray = require("../utils/parseStringAsArray.js");

module.exports = {

    // index, show, store, update, destroy

    async index(request, response){
        const devs = await  Dev.find()

        return response.json(devs)
    },

    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            // console.log(apiResponse.data)
            const { name = apiResponse.data.login, avatar_url, bio, } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: "Point",
                coordinates:[longitude, latitude]
            }
        
         dev =  await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        
        }

    
        return response.json(dev)
    }
}