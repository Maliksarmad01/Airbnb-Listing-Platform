require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const geocoder = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

async function geocode(query) {
  try {
    const res = await geocoder.forwardGeocode({ query, limit: 1 }).send();
    return res.body.features[0].geometry;
  } catch (e) {
    console.log(`Geocoding failed for "${query}", using [0,0]`);
    return { type: "Point", coordinates: [0, 0] };
  }
}

async function initDB() {
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("Connected to DB");

  let owner = await User.findOne({ username: "demo" });
  if (!owner) {
    owner = await User.register(
      new User({ username: "demo", email: "demo@example.com" }),
      "demo1234"
    );
  }

  await Listing.deleteMany({});
  const listings = [];
  for (const obj of initData.data) {
    listings.push({
      ...obj,
      owner: owner._id,
      geometry: await geocode(`${obj.location}, ${obj.country}`),
    });
  }
  await Listing.insertMany(listings);
  console.log(`Seeded ${listings.length} listings`);
  await mongoose.connection.close();
}

initDB().catch((err) => {
  console.error(err);
  process.exit(1);
});