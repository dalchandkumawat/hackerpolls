const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Candidate= mongoose.model("Candidate");
const jwt=require('jsonwebtoken');
const adminCode = "0000";
const JWTTOKEN = 'akddlfadjfdsakdflda';
const requireAdmin = require('../middlewares/requireAdmin');

router.post('/addCandidates',requireAdmin,requireAdmin,(req,res)=>{
    const {name,noOfChallengesSolved, candidateExpertiseLevel,expertIn} = req.body;
    if(!name||!noOfChallengesSolved||!candidateExpertiseLevel||!expertIn){
        return res.status(421).json({error:"Please enter proper input"});
    }
    const CandidateModel=new Candidate({
        name,noOfChallengesSolved,candidateExpertiseLevel,expertIn
    });
    CandidateModel.save()
    .then(candidateDetails=>{
        if(candidateDetails){
            return res.json(candidateDetails);
        }
        else{
            return res.status(421).json({error:"Error"});
        }
    })
    .catch(err=>console.log(err));
})

router.get('/getCandidates',(req,res)=>{
    Candidate.find().then(result=>{
        if(result){
            res.json(result);
        }
        else{
            return res.status(421).json({error:"Error"});
        }
    })
    .catch(err=>console.log(err));
})

router.get('/getCandidate/:candidateId',(req,res)=>{
    Candidate.find({_id: req.params.candidateId})
    .then(result=>{
        if(result){            
            res.json(result);
        }
        else{
            return res.status(421).json({error:"Error"});
        }
    })
    .catch(err=>console.log(err));
})

router.put('/editCandidate',requireAdmin,(req,res)=>{
    const {_id, name,noOfChallengesSolved, candidateExpertiseLevel,expertIn} = req.body;
    Candidate.findOne({_id: _id}).then(candidate=>{
        candidate.name=name;
        candidate.noOfChallengesSolved=noOfChallengesSolved;
        candidate.candidateExpertiseLevel=candidateExpertiseLevel;
        candidate.expertIn= expertIn;
        candidate.save().then(result=>{
            if(result){
                res.json(result);
            }
            else{
                return res.status(421).json({error:"Error"});
            }
        })
    })
    .catch(err=>console.log(err));
})

router.delete('/deleteCandidate/:candidateId',requireAdmin,(req,res)=>{
    Candidate.findOne({_id:req.params.candidateId})
    .then(result=>{
        result.remove().then((result)=>{
            //Do something
            res.json({message:"Success"})
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err))
})

router.put('/addVote',(req,res)=>{
    Candidate.findByIdAndUpdate(req.body._id,{
        $push:{votes:req.body.ip}
    },{new:true},(err,result)=>{
        if(err) console.log(err);
        res.json(result);
    })
})

router.post('/adminLogin',(req,res)=>{
    const {code} = req.body;
    if(code === adminCode){
        const token=jwt.sign({admin:true},JWTTOKEN);
        res.json({token,message:"Logged in"});
    }
    else{
        return res.status(401).json({error:"Incorrect code"});
    }
})
module.exports= router