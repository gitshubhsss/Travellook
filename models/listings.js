//defining the listing schema
const { ref } = require("joi");
const Review = require("./rewiew");
let defaultImages = [
  "https://images.homify.com/v1437715720/p/photo/image/110183/vpx-5951.jpg",
  "https://a0.muscache.com/im/pictures/1ff6d909-5ba6-42f3-9d2c-fa2327780936.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-23721944/original/33c2cc4a-9a30-4fc5-8739-333593621604.jpeg?im_w=720",
  "https://static.wanderon.in/wp-content/uploads/2023/12/airbnb-vs-hotels.png",
];

let length = defaultImages.length - 1;
let randomImageIndex = Math.floor(Math.random() * length);

const mongoose = require("mongoose");
const { type } = require("../Schema/listingSchema");
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/TravelNook");
// }
// main()
//   .then(() => {
//     console.log("connection successfull");
//   })
//   .catch(() => {
//     console.log("connection issue");
//   });

//defining the listing Schema
const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    //this is the listings owner
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: ["rooms", "iconiccities", "historicalhomes", "mountains", "catles", "pools", "camping", "farm"]
  }
});

//after deleteing the llisting we also gonna delte the reviews also
ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
