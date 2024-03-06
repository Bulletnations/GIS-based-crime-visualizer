const Crime = require('../models/crimes'); // Import the crime model

// Controller functions for handling crime-related requests

exports.getCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find(); // Fetch all crimes from the database
    res.json(crimes); // Send JSON response with all crimes
  } catch (err) {
    console.error(err);
    res.status(500).json('Error fetching crimes'); // Handle errors
  }
};

exports.reportCrime = async (req, res) => {
  try {
    const newCrime = new Crime(req.body); // Create a new crime object from request body
    await newCrime.save(); // Save the new crime to the database
    res.status(201).json({message:'Crime reported successfully'}); // Send success message
  } catch (err) {
    console.error(err);
    res.status(400).send('Error reporting crime'); // Handle errors
  }
};

exports.getCrimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const crime = await Crime.findById(id); // Find crime by ID
    if (!crime) {
      return res.status(404).send('Crime not found'); // Handle non-existent crime
    }
    res.json(crime); // Send JSON response with the crime details
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving crime'); // Handle errors
  }
};

// New function for retrieving nearby crimes
exports.getNearbyCrimes = async (req, res) => {
  try {
    const { longitude, latitude, radius, days } = req.query; // Extract query parameters

    // Validation (optional): Ensure required parameters are present and valid

    // Filter based on location and date (using Mongoose geospatial queries)
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000); // Calculate start date based on provided days
    const endDate = new Date(); // Current date

    const nearbyCrimes = await Crime.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: radius, // Specify search radius in meters
        },
      },
      date: { $gte: startDate, $lte: endDate }, // Filter by date range
    });

    res.json(nearbyCrimes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving nearby crimes'); // Handle errors
  }
};
