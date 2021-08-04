const {Client} = require("@googlemaps/google-maps-services-js");

export default async function getNearbylaces(req, res) {

    const client = new Client({})

    client
    .placesNearby({
        params: {
            location: { lat: req.query.lat, lng: req.query.lng },
            radius: 10000,
            type: "police",
            key: process.env.GOOGLE_MAPS_API_KEY
        },
        timeout: 1000 // milliseconds
    })
    .then(r => {
        res.status(200).json({ content: r.data.results })
    })
    .catch(e => {
        res.status(500).json({ error: e })
    })
}
