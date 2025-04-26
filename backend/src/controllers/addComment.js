import messages from "../models/messages.js";
import { io } from "../server.js";
const addComment = async (req, res) => {
    const userID = parseInt(req.params["userID"]);
    const id = parseInt(req.params["id"]);

    try{
        const newMessage = await messages.create({
            data: {
                content: req.body.message,
                parentID: id,
                createDate: new Date(),
                userID: userID
            }
        })
        io.emit('new_reply', newMessage);
    return res.status(200).json("Added new Message to post");

    } catch (error) {
        console.log(error);
        return res.status(500).json('Failed to add message to DB');
    }
}

export default addComment;