const express = require('express');
const cors = require('cors'); // Corrected module name to 'cors'
const app = express();
const PORT = process.env.PORT || 3001;

// Define your data
const options = [
  { id: 1, option: 'Chocholate', value: 'CHOCHOLATE' }, // Adjusted 'label' to 'option'
  { id: 2, option: 'Apple', value: 'APPLE' },
  { id: 3, option: 'Mango', value: 'MANGO' },
  { id: 4, option: 'Banana', value: 'BANANA' },
  { id: 5, option: 'Papaya', value: 'PAPAYA' },
  { id: 6, option: 'Orange', value: 'ORANGE' },
  // Add more options as needed
];

// Endpoint to get options
app.use(cors());
app.get('/options', (req, res) => {
  res.json(options);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
