import messages from "../models/messages.js";
import { io } from "../server.js";
const editMessage = async (req, res) => {
    const id = parseInt(req.params["id"]);
    const userID = parseInt(req.params["userID"]);
    try{
        await messages.update({
            where: {id: id},
            data: {
                content: req.body.message,
                lastEditedBy: userID,
            }
        })
        io.emit('updated_message');
    return res.status(200).json("Updated message");

    } catch (error) {
        console.log(error);
        return res.status(500).json('Failed to update message');
    }
}

export default editMessage ;