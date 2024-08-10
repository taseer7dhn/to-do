const express =require("express");

const app = express();
const bodyparser =require ("body-parser") ;
const mongoose=require("mongoose");
app.set("view engine","ejs");
const port = 3000;
const axios=require ("axios");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://mdtaseerdhn:Taseer5672@cluster0.e2jtfvs.mongodb.net/?retryWrites=true&w=majority");



const listSchema= new mongoose.Schema({
   name:String
});

const List = new mongoose.model("List",listSchema);

const city="delhi";
const APIURL="https://api.openweathermap.org/data/2.5/weather?q=";
const APIKEY="62254b267a8400d4dcd4fb4c8c4b85c3";

app.get("/",(req,res)=>{
    
  List.find().then(function(jobs){
      console.log(jobs);
  
      res.render("index.ejs",{items:jobs});
  })
  .catch(function(err){
      console.log(err)});
  });


app.get("/", async (req, res) => {
  
    try {
      const response = await axios.get(APIURL + city + `&appid=${APIKEY}`);
       const result = response.data;
      console.log(result);
      res.render("index.ejs", { data: result});
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }

    // List.find().then(function(jobs){
    //   console.log(jobs)
     
    
  })
  // .catch(function(err){
  //     console.log(err);
  // })

  // });

// const job =  new List({
//    name: "swimming"
// });
// job.save().then(function (job){
//     console.log("job saved")})
//     .catch(function(err){
//         console.log(err)});

// var jobs=[];


    // res.render("index.ejs",{items:jobs});


app.post("/",(req,res)=>{
        var item = req.body.job;
        
        const job1 = new List({
          name: item
        });
        job1.save().then(()=>{
            res.redirect("/");
            // console.log("job saved")})
          })
            .catch(function(err){
                console.log(err)});
        
        
});

app.post("/delete",(req,res)=>{
    const checked=req.body.checkbox1;
    // List.findByIdAndRemove(checked);
    List.findByIdAndRemove(checked).then(()=>{
    
        console.log("Deleted");
    })
    .catch(function(err){
        console.log(err);
    });
            res.redirect("/") ;
});

app.listen(port,(req,res)=>{
    console.log(`server running at ${port}`);
});