const express=require('express');
const app=express();
const db =require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());


const { error } = require('console');

const Menuitems=require('./modles/MenuItems');
// const { error } = require('console');


app.get('/',function(req,res){
   res.send('welcome');

});


const personRoutes=require('./routes/personroutes');
app.use('/person',personRoutes);

const menuItemsRoutes=require('./routes/menuItemsRoutes');
app.use('/menu',menuItemsRoutes);




app.listen(3000,()=>{
    console.log('listning to port 3000');

});
