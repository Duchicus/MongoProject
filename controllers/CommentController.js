const Comments = require("../models/Comments");

const CommentsController = {
    async create(req, res) {
        try {
          const comment = await Comments.create({
            ...req.body,
            userId: req.user._id,
            postId: req.params.id
          });
          res.status(201).send(comment);
        } catch (error) {
          console.error(error);
        }
      },
    
};

module.exports = CommentsController;