require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const guestRoutes = require('./routes/guests');

const app  = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.json());

//Routes
app.use('/api/guests', guestRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected:', process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
