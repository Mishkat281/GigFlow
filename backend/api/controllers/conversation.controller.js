import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversations = async (req, res, next) => {
    const newConversation = new Conversation({
        id: req.isSeller ? req.body.userId + req.body.to : req.body.userId + req.body.userId,
        sellerId: req.isSeller ? req.body.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.body.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation);
    } catch (err) {
        next(err);
    }
};

export const getConversations = async (req, res, next) => {
    try{
        const conversations = await Conversation.find(
            req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
        ).sort({updatedAt: -1});
        res.status(200).send(conversations);

    }catch(err){
        next(err);
    }
};

export const getSingleConversations = async (req, res, next) => {
    try{
        const conversation = await Conversation.findOne({
            id: req.params.id,
        });
        res.status(200).send(conversation);

        if(!conversation) return next(createError(404, "Conversation not found!"));
        res.status(200).send(conversation);

    }catch(err){
        next(err);
    }
};

export const updateConversations = async (req, res, next) => {
    try{
        const updatedConversation = await Conversation.findByIdAndUpdate(
            {id: req.params.id},
            {
                $set:{
                   
                    ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
            },
        },
            { new: true }
        );
        res.status(200).send(updatedConversation);

    }catch(err){
        next(err);
    }
};