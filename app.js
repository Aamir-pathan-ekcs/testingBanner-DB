const express = require("express");
const app = express();
const mongose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Serve Chart.js from 'node_modules';
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

mongose.connect("mongodb+srv://maakhan:iqMZFeqCyvDlNh72@cluster0.l9s6zof.mongodb.net/bannerDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
}).then(()=>{
    console.log("database connect");
}).catch(()=>{
    console.log("error with db");
});
app.use(express.json());
const schemNote = new mongose.Schema({
    contents: String 
});
const Sixnoted = mongose.model('300x600DB', schemNote);
const Twonoted = mongose.model('300x250DB', schemNote);
const threeTwonoted = mongose.model('320x50DB', schemNote);
const sevenNinenoted = mongose.model('728x90DB', schemNote);

app.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'chart', 'index.html'));
});

app.get('/count', async (req, res) => {
    try {
        const criteriaValue = async(criteria) =>{
            const sixNotedCount = await Sixnoted.find(criteria);
            const twoNotedCount = await Twonoted.find(criteria);
            const threeNotedCount = await threeTwonoted.find(criteria);
            const sevenNotedCount = await sevenNinenoted.find(criteria);
            return {
                sixNotedCount, twoNotedCount, threeNotedCount, sevenNotedCount
            }
        }
        const mentCriteria = { contents: "Mental Health" };
        const fitCriteria = { contents: "Physical Fitness" };
        const nutCriteria = { contents: "Nutrition" };
        const mindCriteria = { contents: "Mindfulness" };
        const selfCriteria = { contents: "Self-Care" };
        const allCriteria = { contents: "All of the Above" };

        const mentCount = await criteriaValue(mentCriteria);
        const fitCount =  await criteriaValue(fitCriteria);
        const nutCount =  await criteriaValue(nutCriteria);
        const mindCount = await criteriaValue(mindCriteria);
        const selfCount = await criteriaValue(selfCriteria);
        const allCount = await criteriaValue(allCriteria);
        res.json({
            mentalHealth: mentCount,
            physicalFitness: fitCount,
            nutrition: nutCount,
            mindfulness: mindCount,
            selfCare: selfCount,
            allOfTheAbove: allCount,
        });
        
    } catch (err) {
        console.error('Error counting documents:', err);
        res.status(500).send('An error occurred while counting documents');
    }
});


app.get('/300x600', function(req, res) {
    res.sendFile(path.join(__dirname, '300x600', 'index.html'));
});
app.get('/300x250', function(req, res) {
    res.sendFile(path.join(__dirname, '300x250', 'index.html'));
});
app.get('/320x50', function(req, res) {
    res.sendFile(path.join(__dirname, '320x50', 'index.html'));
});
app.get('/728x90', function(req, res) {
    res.sendFile(path.join(__dirname, '728x90', 'index.html'));
});

app.post('/300x600', async (req, res) => {
    const { contents } = req.body;
    try {
        const newData = new Sixnoted({ contents });
            newData.save();
        res.status(200).send('Data saved successfully');
    } catch (err) {
        res.status(500).send('Error saving data');
    }
});
app.post('/300x250', async (req, res) => {
    const { contents } = req.body;
    try {
        const newData = new Twonoted({ contents });
            newData.save();
        res.status(200).send('Data saved successfully');
    } catch (err) {
        res.status(500).send('Error saving data');
    }
});
app.post('/320x50', async (req, res)=>{
    const { contents } = req.body;
    try{
        const newdata = new threeTwonoted({ contents });
        newdata.save();
    }catch (err){
        res.status(500).send('Error saving data');
    }
});
app.post('/728x90', async(req, res)=>{
    const { contents } = req.body;
    try {
        const newdata = new sevenNinenoted({ contents });
        newdata.save();
    }catch (err){
        res.status(500).send('Error saving data');
    }
})

app.listen(PORT,()=>{
    console.log("app is running correctly");
})