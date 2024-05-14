const Comment = require("../models/Comment");
const Post = require("../models/Post");

const CommentsController = {
    async create(req, res) {
        try {
          const comment = await Comment.create({
            ...req.body,
            userId: req.user._id,
            postId: req.params.id,
          });
          await Post.findByIdAndUpdate(req.params.id, { $push: { commentsId: comment._id } })
          res.status(201).send(comment);
        } catch (error) {
          console.error(error);
        }
      },
    async delete(req, res) {
        try {
            const comment = await Comment.findOneAndDelete({_id : req.params.id});
            res.status(201).send(comment);
        } catch (error) {
            console.error(error);
        }
    },
    async update(req, res) {
        try {
            const comment = await Comment.findOneAndUpdate({_id : req.params.id},{ $set:{text:req.body.text}});
            res.status(201).send(comment);

        } catch (error) {
            console.error(error);
        }
    },
    async like(req, res) {
        try {
          const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $push: { likes: req.user._id } },
            { new: true }
          );
          res.send(comment);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Hay un problema con tu like" });
        }
    },async dislike(req, res) {
        try {
          const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user._id } },
            { new: true }
          );
          res.send({message: "dislike puesto",comment});
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Hay un problema con tu dislike" });
        }
    },   
};

module.exports = CommentsController;