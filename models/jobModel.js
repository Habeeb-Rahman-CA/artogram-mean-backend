const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    jobType: { type: String, required: true, enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'] },
    category: { type: String, required: true, enum: ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art'] },
    numberOfOpening: { type: Number, required: true, default: 0 },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salary: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    postedDate: { type: Date, default: Date.now() },
    deadlineDate: {
        type: Date,
        default: () => {
            const deadline = new Date()
            deadline.setDate(deadline.getDate() + 30)
            return deadline
        }
    }
})

module.exports = mongoose.model('Job', jobSchema)