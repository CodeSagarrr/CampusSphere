import { eventModel, noticeModel , StudentQuery } from "../model/facultySeviceModel.js";

export const getRecentNoticeActivity = async (req, res) => {
    try {
        const [notices ] = await Promise.all([
            noticeModel.find().sort({ createdAt: -1 }).limit(5).select("title priority createdAt"),
        ]);
    
        const combined = [
            ...notices.map(item => ({ type: "notice", title: item.title, priority : item.priority , createdAt: item.createdAt })),
        ];

        // Sort all by createdAt
        const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: "Failed to load recent activities", error });
    }
};
export const getRecentQueryActivity = async (req, res) => {
    try {
        const [ queries] = await Promise.all([
            StudentQuery.find().sort({createdAt : -1}).limit(5).select("subject questionTitle isAnswered createdAt"),
        ]);
    
        const combined = [
            ...queries.map(item => ({ type: "queries", title: item.subject, question : item.questionTitle , isAnswered : item.isAnswered ,  createdAt: item.createdAt })),
        ];

        // Sort all by createdAt
        const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: "Failed to load recent activities", error });
    }
};
export const getRecentEventActivity = async (req, res) => {
    try {
        const [events ] = await Promise.all([
            eventModel.find().sort({createdAt : -1}).limit(5).select("title location createdAt"),
        ]);
    
        const combined = [
            ...events.map(item => ({ type: "events", title: item.title, location : item.location , createdAt: item.createdAt })),    
        ];

        // Sort all by createdAt
        const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: "Failed to load recent activities", error });
    }
};

export const studentRegisterEvent = async(req , res) => {
    const { queryId } = req.params;
    const userId = req.user.id;
    try {
        const updateQuery = await eventModel.findByIdAndUpdate(
            queryId,
            {
                $addToSet: { participants: userId },
                isParticipated : true,
            },
            { new: true }
        );
        res.status(200).json({message : "register successfully" , user : updateQuery});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to load recent activities", error });
    }
}