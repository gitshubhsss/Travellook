module.exports=(fn)=> {
    //we have create the asyncErrorHandeler funtion which takes a Asychronus funtion as an argumets
    //and returns the funtion  that returned funtion is calling to the the asysnc funtion 
    //since its a async funtion so it will return the promise the promise is rejected then will 
    //catch the error and and call to the next error handeling middleware
    return function (req, res, next) {
      fn(req, res, next).catch((err) => {
        next(err);
      });
    };
  }