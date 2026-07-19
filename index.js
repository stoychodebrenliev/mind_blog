import express from 'express';
import hbs from 'express-hbs';


const app = express();
const PORT = 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.engine('hbs', hbs.express4())

app.set('view engine', 'hbs');

app.set('views', './src/views');

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
    
})
