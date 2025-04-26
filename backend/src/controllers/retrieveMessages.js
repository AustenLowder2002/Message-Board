import messages from "../models/messages.js";

const retrieveMessages = async (req,res) => {
    try{
        const totalMessages = await messages.findMany({
            where: {deleteDate: {equals: null}}
        });
        return res.status(200).json(totalMessages);

    } catch (e){
        return res.status(500).json("Internal Server error");
    }
}

export default retrieveMessages;