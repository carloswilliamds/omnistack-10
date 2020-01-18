const Dev = require("../models/Dev")
const parseStringAsArray = require("../utils/parseStringAsArray.js");

module.exports = {
    async index(request, response){
      // buscar todos os devs num raio de 10km
      // filtrar por tecnlogias 
      const {techs, latitude, longitude} = request.query;
      const techsArray = parseStringAsArray(techs);
      console.log(request.query)
      console.log(techsArray)

      const devs = await Dev.find({
          techs: {
              $in: techsArray,
          },
          location: {
              $near: {
                  $geometry:{
                      type: "Point",
                      coordinates: [longitude, latitude]
                  },
                  $maxDistance: 10000
              }
          }
      })

      return response.json({devs})
    }
}