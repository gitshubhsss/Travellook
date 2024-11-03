const Listing=require("../models/listings");

const sampleListings=require("./sampleData.js");


async function insertData(){
    await Listing.deleteMany({});
    sampleListings.data=sampleListings.data.map((obj)=>({
        ...obj,
        owner:"670235d0a5ad05481d36a8ac"

    }));

    await Listing.insertMany(sampleListings.data);
    console.log('data was initiazide');
    
}

insertData().then(()=>{
    console.log("data store successfully");
    
}).catch(()=>{
    console.log("error occured");
})

