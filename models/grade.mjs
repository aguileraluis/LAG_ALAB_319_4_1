import mongoose from 'mongoose';

const gradesSchema = new mongoose.Schema({
    scores: { type: Array, required: true },
    class_id: { type: Number, required: true },
    learner_id: { type: Number, required: true },
});

var Grades =  mongoose.model('Grades', gradesSchema,);

export default Grades; 