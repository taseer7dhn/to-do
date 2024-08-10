
app.set("view engine","ejs");
const port = 3000;
const axios=require ("axios");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://mdtaseerdhn:Taseer5672@cluster0.e2jtfvs.mongodb.net/?retryWrites=true&w=majority");



const listSchema= new mongoose.Schema({
   name:String
});
