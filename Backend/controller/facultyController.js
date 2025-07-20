import { eventModel, noticeModel, studyResourceModel, StudentQuery } from "../model/facultySeviceModel.js";
import { UserAuth } from "../model/userAuth.js";

// get all user student
export const getAllStudent = async (req, res) => {
    try {
        const getStudentUser = await UserAuth.find({ role: "student" }).select("-password")
        res.status(200).json({ studentUser: getStudentUser })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

// Notice board fuunctions 
//  create notice of faculty

export const createNotice = async (req, res) => {
    const { title, priority, content } = req.body;
    if (!title || !priority || !content) return res.status(400).json({ message: "All Fields are required" })

    try {
        const Notice = await noticeModel({
            title,
            priority,
            content,
            postedBy: req.user.id,
        })
        await Notice.save();
        res.status(200).json({ message: "Notice create successfully", notice: Notice })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// get all notice

export const getNotice = async (req, res) => {
    try {
        const notices = await noticeModel.find({})
            .sort({ createdAt: -1 })
            .populate("postedBy", "firstname lastname role");

        res.status(200).json(notices);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// study resource functions
// add all study books and resources

export const addStudyResource = async (req, res) => {
    const { title, subject, course, semester } = req.body;
    if (!title || !subject || !course || !semester) return res.status(400).json({ message: "All fields are required" })
    try {
        const studyResource = await studyResourceModel({
            title,
            subject,
            course,
            semester,
            file: req.file.filename,
            uploadedBy: req.user.id,
        })
        await studyResource.save();
        res.status(200).json({ message: "Study resource added successfully", studyResource: studyResource })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// get all study resource
export const getStudyResource = async (req, res) => {
    try {
        const studyResources = await studyResourceModel.find({})
            .sort({ createdAt: -1 })
            .populate("uploadedBy", "firstname lastname role");
        res.status(200).json(studyResources);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// event functions
// create event
export const createEvent = async (req, res) => {
    const { title, description, date, time, location, eventType } = req.body;
    if (!title || !description || !date || !time || !location || !eventType) return res.status(400).json({ message: "All fields are required" })
    try {
        const event = await eventModel({
            title,
            description,
            date,
            time,
            location,
            eventType,
            postedBy: req.user.id,
        })
        await event.save();
        res.status(200).json({ message: "Event created successfully", event: event })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}


export const getAllEvent = async (req, res) => {
    try {
        const events = await eventModel.find({})
            .sort({ createdAt: -1 })
            .populate("postedBy", "firstname lastname role");
        res.status(200).json(events);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

export const getRecentActivity = async (req, res) => {
    try {
        const [notices, resources, events, queries] = await Promise.all([
            noticeModel.find().sort({ createdAt: -1 }).limit(5).select("title createdAt"),
            studyResourceModel.find().sort({ createdAt: -1 }).limit(5).select("title createdAt"),
            eventModel.find().sort({ createdAt: -1 }).limit(5).select("title createdAt"),
            StudentQuery.find().sort({ createdAt: -1 }).limit(5).select("subject createdAt")
        ]);
    
        const combined = [
            ...notices.map(item => ({ type: "notice", title: item.title, createdAt: item.createdAt })),
            ...resources.map(item => ({ type: "resource", title: item.title, createdAt: item.createdAt })),
            ...events.map(item => ({ type: "event", title: item.title, createdAt: item.createdAt })),
            ...queries.map(item => ({ type: "query", title: item.subject, createdAt: item.createdAt }))
        ];

        // Sort all by createdAt
        const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: "Failed to load recent activities", error });
    }
};

// GET and POST student query

export const postStudentQuery = async (req, res) => {
    const { subject, questionTitle,questionContent , to } = req.body;
    console.log(subject, questionTitle,questionContent , to )
    try {
        const newQuery = await StudentQuery({
            subject,
            questionTitle,
            questionContent,
            to,
            askedBy: req.user.id
        })
        await newQuery.save();
        res.status(200).json({ message: "Query submitted successfully", newQuery });
    } catch (error) {
        console.error("Error posting student query:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getStudentQuery = async (req, res) => {
    try {
        const queries = await StudentQuery.find({})
            .sort({ createdAt: -1 })
            .populate("askedBy", "firstname lastname email role")
        res.status(200).json({ message: "success", queries })
    } catch (error) {
        console.error("Error posting student query:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// create response of student query
export const respondToQuery = async (req, res) => {
    try {
        const { queryId } = req.params;
        const { response } = req.body;

        const updatedQuery = await StudentQuery.findByIdAndUpdate(
            queryId,
            {
                response,
                isAnswered: true,
                answeredAt: new Date()
            },
            { new: true }
        );

        res.status(200).json({ message: "Query answered", updatedQuery });
    } catch (error) {
        console.error("Error updating query:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};