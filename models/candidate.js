//mongodb+srv://test:test@cluster0.0oxtg.mongodb.net/voting?retryWrites=true&w=majority
const mongoose=require('mongoose');
const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    noOfChallengesSolved:{
        type: Number,
        required:true
    },
    candidateExpertiseLevel:{
        type: Number,
        required:true
    },
    expertIn:{
        type: JSON,
        required: true
    },
    votes: Array
})

mongoose.model("Candidate",candidateSchema);
