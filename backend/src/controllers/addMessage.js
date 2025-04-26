import messages from "../models/messages.js";
import { io } from "../server.js";
const addMessage = async (req, res) => {
    const userID = parseInt(req.params["userID"]);

    try{
        const newMessage = await messages.create({
            data: {
                content: req.body.message,
                createDate: new Date(),
                userID: userID
            }
        })
        io.emit('new_message', newMessage);
    return res.status(200).json("Added new Message");

    } catch (error) {
        console.log(error);
        return res.status(500).json('Failed to add message to DB');
    }
}

export default addMessage;