import express from 'express';
import Internship from '../models/Internship.js';
import { saveBase64Image } from '../Upload.js';

const router = express.Router();

// Create a new internship
router.post('/internships', async (req, res) => {
  try {
    const {
      companyName,
      contactEmail,
      contactPhone,
      positionTitle,
      prerequisites,
      description,
      duration,
      stipend,
      location,
      companyLogo
    } = req.body;
    
    // Validate required fields
    const requiredFields = ['companyName', 'contactEmail', 'contactPhone', 'positionTitle', 'prerequisites', 'description'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    
    // Process the company logo if present
    let logoPath = null;
    if (companyLogo) {
      logoPath = saveBase64Image(companyLogo);
    }
    
    const newInternship = new Internship({
      companyName,
      contactEmail,
      contactPhone,
      positionTitle,
      prerequisites,
      description,
      duration,
      stipend,
      location,
      companyLogo: logoPath
    });
    
    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({ message: 'Error creating internship', error: error.message });
  }
});

// Update an existing internship
router.put('/internships/:id', async (req, res) => {
  try {
    const {
      companyName,
      contactEmail,
      contactPhone,
      positionTitle,
      prerequisites,
      description,
      duration,
      stipend,
      location,
      companyLogo
    } = req.body;
    
    // Process the company logo if present and it's a new one
    let logoPath = undefined; // undefined means don't update this field
    if (companyLogo && companyLogo.startsWith('data:image')) {
      logoPath = saveBase64Image(companyLogo);
    }
    
    const updateData = {
      companyName,
      contactEmail,
      contactPhone,
      positionTitle,
      prerequisites,
      description,
      duration,
      stipend,
      location
    };
    
    // Only update the logo if a new one was provided
    if (logoPath !== undefined) {
      updateData.companyLogo = logoPath;
    }
    
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    
    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(500).json({ message: 'Error updating internship', error: error.message });
  }
});

// Delete an internship
router.delete('/internships/:id', async (req, res) => {
  try {
    const deletedInternship = await Internship.findByIdAndDelete(req.params.id);
        
    if (!deletedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
        
    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting internship', error: error.message });
  }
});

export default router;
