const multer = require("multer");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,upload_path);
  },
  filename:function(req,file,cb){
    cb(null,file.originalname);
  }
});

let root_path = "/home/user1";
let upload_path = __dirname+"/uploads";
let clip_data = " Have a Good Day Master";

app.use('/static',express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
app.use(multer({storage:storage}).any());

app.get('/',function(req,res){
  res.sendFile(__dirname+"/public/index.html");
});
app.get("/browse",function(req,res){
  res.sendFile(__dirname+"/public/dl_page.html");
});
app.get("/list",function(req,res){
  console.log("got request:LIST FILES");
  let dir_path = req.query.path;
  let con = fs.readdirSync(dir_path);
  let fils=[]
  let folds = [];
  //separating files and folders
  for(let i=0;i<con.length;i++)
  { 
    if(fs.lstatSync(dir_path+'/'+con[i]).isFile())
    {  
      if(!con[i].startsWith("."))
        fils.push(con[i]);
    }
    else
        folds.push(con[i]);
  }
  res.send({"files":fils,"folders":folds});
  console.log("sent response:LIST FILES");
});
app.get("/download",function(req,res){
  let file_path = req.query.path;
  res.download(file_path);
});
app.post("/upload",function(req,res){
  console.log(req.files);
  res.redirect("/browse?path="+upload_path+"&mode=ul");
});
app.post("/cc",(req,res)=>{
  clip_data = req.body.data;
  console.log(clip_data);
  res.redirect("/");
});
app.get("/getcc",(req,res)=>{
  res.send({cdata:clip_data,pth:root_path,uplpth:upload_path});
});
app.listen(PORT);