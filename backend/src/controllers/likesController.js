import messages from "../models/messages.js";
import { io } from "../server.js";
const likesController = async (req, res) => {
    const id = parseInt(req.params["id"]);
    try{
        const updatedMessage = await messages.update({
            where: {id: id},
            data: {likes: {increment: 1} }
        });
        io.emit('new_like', updatedMessage.likes);
        return res.status(200).json(updatedMessage.likes);
    }catch(e){
        console.log(e);
        return res.status(500).json('Failed to like message');
    }
}

export default likesController;