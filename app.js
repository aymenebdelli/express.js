const express = require('express');
const morgan = require('morgan');

// express app
const app = express();
app.use(express.static('public'));

app.use(
    (workingTime =(req, res, next)=>{
        const days = new Date().getDay();
        const hours = new Date().getHours();

        if ((days === 0) || (days === 6) || hours <= 9 || hours >= 17){
            
                res.sendFile(__dirname+'/views/closed.html');
             
        }else{
            next();
        }
    }
    )
)

// register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(5000);



// middleware & static files
// app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/', (req,res)=>{
res.render('home');
})

//Test
// app.get('/closed', (req,res)=>{
//     console.log(res.sendFile(__dirname+'/views/closed.html'))
//     res.sendFile(__dirname+'/views/closed.html');
//     })

app.get('/about', (req,res)=>{
    res.render('about');
    })

   app.get ('/services', (req,res)=>{
       res.render('services');
   })

    // 404 page
app.use((req,res)=>{
    res.status(404).render('404');
})