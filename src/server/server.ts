import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get('/',(req,res) => {
    res.send('Hello World');
})
