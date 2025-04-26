import messages from "../models/messages.js";
import { io } from "../server.js";
const removeMessage = async (req, res) => {
    try{
        const id = parseInt(req.params["id"]);
        console.log(id);
        await messages.update({
            where: {id: id},
            data: {deleteDate: new Date()}
        })
        io.emit('message_removed');
        return res.status(200).json('Message Deleted');
    }catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export default removeMessage;