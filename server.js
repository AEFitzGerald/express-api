const express = require("express");
const app = express();
const port = 8000;

// make sure these lines are above any app.get or app.post code blocks
// to access post data we use these settings so that we can pull data out of request object
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
// espress.urlencoded() and express.json() are Express middleware functions
// they are responsible for providing and parsing the request.body data

const quotesTable = [
    {content:"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou"},
    {content:"The sharing of joy, whether physical, emotional, psychic, or intellectual, forms a bridge between the sharers which can be the basis for understanding much of whatis not shared between them, and lessens the threat of their difference.",author: "Audre Lorde"}
]

// request and response/second method is callback function 
//app instance has diff. HTTP verb methods
app.get("/api/", (req, res)=> {
    res.json({ status:"OK", message: "Hello World" });
});

app.get("/api/quotes", (req, res)=>{
    res.json({status: "OK", count: quotesTable.length,data: quotesTable})
})

app.post("/api/quotes", (req,res)=>{
    console.log("*******", req.body);
    //req.body contains the form data
    quotesTable.push(req.body)
    res.json({status:"OK", count: quotesTable.length, data: quotesTable})
})

app.get("/api/quotes/:idx", (req, res)=>{
    console.log("REQ PARAMS IS THIS -->",req.params)
    res.json({
        data: quotesTable[req.params.idx],
        msg: "ok"
    })
})

app.put("/api/quotes/:idx", (req,res)=>{
    console.log("****PUT updates", req.body)
    quotesTable[req.params.idx] = req.body
    res.json({
        staus: "OK",
        count: quotesTable.length,
        data: quotesTable
    })
})

app.delete("/api/quotes/:idx", (req, res)=>{
        const idx = req.params.idx;
        // assuming this id is the index of the users array we can remove the user like so
        users.splice(idx, 1);
        res.json( { status: "ok" } );
    });
    

// this runs our server at specified port
// this needs to below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );


