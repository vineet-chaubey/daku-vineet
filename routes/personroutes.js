const express=require('express');

const router=express.Router();

const Person=require('./../modles/person');

router.get('/',async (req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.post('/',async (req,res)=>{
    try{
    const data=req.body;
    const newperson=new Person(data);

    const response = await newperson.save();
    console.log('data saved');
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

})

router.get('/:workType',async (req,res)=>{
    try{
        const worktype=req.params.workType;
        if(worktype=='chef' || worktype=='manager'|| worktype=='waiter' )
         {
        const response =await Person.find({work:worktype});
        console.log('response fetched');
        res.status(200).json(response)
         }else{
            res.status(404).json({error:'Invalid work type'});
         }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});

    }
});


router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data delete');
        res.status(200).json('data deleted succesfully');
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});

    }
});



module.exports=router;