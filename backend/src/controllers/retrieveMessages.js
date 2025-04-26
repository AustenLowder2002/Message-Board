import messages from "../models/messages.js";

const retrieveMessages = async (req,res) => {
    try{
        const totalMessages = await messages.findMany({
            where: {AND: [{deleteDate: {equals: null}, parentID: {equals: null}}]},
            include: {replies: true}
        });
        return res.status(200).json(totalMessages);

    } catch (e){
        return res.status(500).json("Internal Server error");
    }
}

export default retrieveMessages;