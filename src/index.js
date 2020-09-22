require('./models/User'); 
require('./models/HealthInfo'); 
const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/authRoutes'); 
const HealthInfoRoutes = require('./routes/HealthInfoRoutes'); 
const requireAuth = require('./middlewares/requireAuth'); 

const app = express(); 

app.use(bodyParser.json()); 
app.use(authRoutes);
app.use(HealthInfoRoutes);  

const mongoUri = 'mongodb+srv://Nikita:jha234@cluster0-hwy21.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance'); 
}); 
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err); 
});


//Want to make sure user has real web token before accessing below method. For that, we use middleware file
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`); 
}); 

app.listen(3000, () => {
    console.log('Listening on port 3000'); 
});