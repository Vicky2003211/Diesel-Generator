const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dgRoutes = require('./Routes/Route'); // Make sure the filename and path match exactly

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Correct mongoose.connect syntax
mongoose.connect('mongodb://127.0.0.1:27017/DGmonitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Mongoose DB Connected'))
.catch((err) => console.error('❌ DB Connection Error:', err));

app.use('/api/dgs', dgRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
