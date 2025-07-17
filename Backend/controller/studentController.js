import { eventModel, noticeModel } from "../model/facultySeviceModel.js";

export const getRecentNoticeActivity = async (req, res) => {
    try {
        const [notices , events] = await Promise.all([
            noticeModel.find().sort({ createdAt: -1 }).limit(5).select("title createdAt"),
            eventModel.find().sort({createdAt : -1}).limit(5).select("title createdAt")
        ]);
    
        const combined = [
            ...notices.map(item => ({ type: "notice", title: item.title, createdAt: item.createdAt })),
            ...events.map(item => ({ type: "events", title: item.title, createdAt: item.createdAt }))
        ];

        // Sort all by createdAt
        const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: "Failed to load recent activities", error });
    }
};

export const studentRegisterEvent = async(req , res) => {
    const { queryId } = req.params;

    try {
        const updateQuery = await eventModel.findByIdAndUpdate(
            queryId,
            {
                participants : queryId,
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