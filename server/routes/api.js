const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = require('../models/user');
const CompanyData = require('../models/companyData')
const request = require('request');
const Feedback = require('../models/feedback');
const db = "mongodb+srv://saiompal:saiompal@cluster0.vpthd.mongodb.net/Investo?retryWrites=true&w=majority";

mongoose.connect(db,err=>{
    if(err){
        console.log('Error: '+err);
    }else{
        console.log('Connected to mongodb');
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload  = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()
}

router.post('/watchlist',verifyToken,(req,res)=>{
    let company_ticker = req.body.symbol
    let username_body = req.body.username
    try{
        User.findOneAndUpdate({
       username:username_body,
    },
    {
        $addToSet:{
            watchlist:company_ticker,
        },
    },
    function(err,doc) {
        if (err) { throw err; }
        else { 
            const options = {
                method: 'GET',
                url: 'https://alpha-vantage.p.rapidapi.com/query',
                qs: {function: 'GLOBAL_QUOTE', symbol:company_ticker},
                headers: {
                  'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                  'x-rapidapi-key': '423672ab56mshc8f8270f6c85ac6p10a188jsn2ee3b1e6bfca',
                  useQueryString: true
                }
              };
              
              request(options, function (error, response, body) {
                  if (error) throw new Error(error);
                  
                  let data = JSON.parse(body)["Global Quote"];
                  CompanyData.findOne({company:data['01. symbol']},(error,watchlist_data)=>{
                    if(error){
                        console.log(error)
                    }else{
                        if(!watchlist_data){
                            let company_data = new CompanyData({"company":data['01. symbol'],"price":parseFloat(data['05. price']),"change_percent":parseFloat(data['10. change percent'])})
                            company_data.save();
                            console.log('data_saved');
                        }else{
                            console.log("Already exist")
                        }
                    }
                }) 
              });
         }
    });
    }catch(err){
        console.log(err)
    }
    
    res.status(200).send(company_ticker.symbol)
    
})

router.post('/watchlistarr',(req,res)=>{
    let name = req.body
    let watchlist_data;
    User.findOne({username: name.username}, (error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid username')
            }else{
                watchlist_data = user.watchlist;
                res.status(200).send(watchlist_data);
            }
        }
    })
})

router.post('/companydata',verifyToken,(req,res)=>{
    let name = req.body
    CompanyData.findOne({company: name.companyname}, (error,data)=>{
        if(error){
            console.log(error)
        }else{
            if(!data){
                res.status(401).send('Data unavailable')
            }else{
                res.status(200).send(data);
            }
        }
    })
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
            let payload ={subject: registeredUser._id}
            let token=jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
})
router.post('/feedback',verifyToken,(req,res)=>{
    let feedbackData = req.body
    let feedback = new Feedback(feedbackData)
    feedback.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
            res.status(200).send({feedback})
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({email: userData.email}, (error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else{
                if(user.password!==userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                    let name=user.username;
                    let user_type = user.type;
                    let payload ={subject: user._id}
                    let token=jwt.sign(payload,'secretKey')
                    res.status(200).send({token,user_type,name})
                }
            }
        }
    })

})

router.post('/delete',(req,res)=>{
    let name = req.body.name;
    let companyname = req.body.company;
    User.findOneAndUpdate({
        username:name,
    },
    {
        $pull:{
            watchlist:companyname,
        }

    },{ safe: true, upsert: true },
    function(err, node) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(node);
    }
    );

})

module.exports=router;