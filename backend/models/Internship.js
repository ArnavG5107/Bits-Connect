import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true
  },
  positionTitle: {
    type: String,
    required: true,
    trim: true
  },
  prerequisites: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    trim: true,
    default: null
  },
  stipend: {
    type: String,
    trim: true,
    default: null
  },
  location: {
    type: String,
    trim: true,
    default: null
  },
  companyLogo: {
    type: String,  // URL or path to the image
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
internshipSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;