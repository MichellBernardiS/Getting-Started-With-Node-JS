const messModel = require("../model/send");

const getMessageController = (req, res, next) => {
    try{
        const Message = messModel.getMessages();
        if(!Message){
            res.status(404).send("There are no messages!!");
        }
        res.render(path.join(__dirname, '../views/index.ejs'), {items: Message});
    }catch(error){
        res.status(500).send({error:error});
    }
}

const sendMessageController = (req, res, next) => {
    try{
        const createMessage = messModel.sendMessage(req.body);
        //kasi io conn
        //req.io.sockets.
        res.redirect('/');
    }catch(error){
        res.status(500).send({error:error});
    }
}

exports.getMessageController = getMessageController;
exports.sendMessageController =  sendMessageController;