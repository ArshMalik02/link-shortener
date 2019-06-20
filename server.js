const express=require('express')
const app=express()
const port=3000
const path=require('path')
const fs=require('fs')

users=[]

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',express.static("Static"))

app.get('/home', function(req,res){
    res.sendFile(path.join(__dirname,"/Static/html/home.html"))
}
)

app.post('/home', function(req,res,next){
    users.push(req.body)
    res.sendFile(path.join(__dirname,"/Static/html/submit.html"))
    fs.writeFile('users.txt', JSON.stringify(users),(err)=>{
        console.log(err)
        
   })

})



app.use('/home/:link', function(req,res){
    let link= req.params.link
    
    for(let i of users){
        
        if(i.shortlink==link){
            res.redirect(i.url)
            }
       else{res.sendFile(path.join(__dirname,"/Static/html/sorry.html"))}
    }
    
})

app.listen(port, function(){
    console.log('Port started')
})