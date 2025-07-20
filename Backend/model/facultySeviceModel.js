import mongoose from "mongoose";


const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    content: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timeStamp: true });

const studyResourceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timeStamp: true })


const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
    },
    participants :[{ type: mongoose.Schema.Types.ObjectId, ref : "UserAuth" }],
    isParticipated: {
        type: Boolean,
        default: false
    },
    answeredAt: {
        type: Date
    },
    eventType: {
        type: String,
        enum: ["workshop", "seminar", "exam", "festival", "other"],
        default: "other",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timeStamp: true })


const studentQuerySchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    questionTitle: {
        type: String,
        required: true
    },
    questionContent: {
        type: String,
        required: true
    },
    to : {
        type : String,
        enum : ["Faculties" , "Hod"],
        default : "Faculties"
    },
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    response: {
        type: String
    },
    answeredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });


export const noticeModel = mongoose.model("noticeModel", noticeSchema);
export const studyResourceModel = mongoose.model("studyResourceModel", studyResourceSchema);
export const eventModel = mongoose.model("eventModel", eventSchema);
export const StudentQuery = mongoose.model("StudentQuery", studentQuerySchema);