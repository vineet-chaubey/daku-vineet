const express=require('express');

const router=express.Router();

const Menuitems=require('./../modles/MenuItems');


router.post('/',async (req,res)=>{
    try{
    const data=req.body;
    const newMenu=new Menuitems(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

});




router.get('/',async (req,res)=>{
    try{
        const data=await Menuitems.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

});

module.exports=router;