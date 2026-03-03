const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  templateId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['ATS Friendly', 'Executive', 'Creative', 'Corporate', 'Technical', 'Minimal', 'Entry Level']
  },
  description: { 
    type: String, 
    required: true 
  },
  color: {
    primary: { type: String, default: '#4361ee' },
    secondary: { type: String, default: '#3a0ca3' },
    accent: { type: String, default: '#f72585' }
  },
  features: [String],
  layout: { 
    type: String, 
    enum: ['single-column', 'two-column', 'sidebar'],
    default: 'single-column'
  },
  isPremium: { 
    type: Boolean, 
    default: false 
  },
  isPopular: { 
    type: Boolean, 
    default: false 
  },
  downloadCount: { 
    type: Number, 
    default: 0 
  },
  previewImage: { 
    type: String, 
    default: '' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);