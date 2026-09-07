require('dotenv').config();
const express = require("express");
const cors = require("cors")
const authRoutes = require('./src/routes/authRoutes')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});