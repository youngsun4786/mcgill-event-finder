"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostController = exports.updatePostController = exports.getPostsController = exports.createPostController = void 0;
const post_service_1 = require("../services/post.service");
const post_service_2 = require("../services/post.service");
const createPostController = async (req, res, next) => {
    try {
        const { email, ...postInfo } = req.body;
        const newPost = await (0, post_service_2.createPost)(email, postInfo);
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json(error.message);
        next(error);
    }
};
exports.createPostController = createPostController;
const getPostsController = async (req, res, next) => {
    try {
        const allPosts = await (0, post_service_1.posts)();
        res.status(200).json(allPosts);
    }
    catch (error) {
        res.status(500).json(error.message);
        next(error);
    }
};
exports.getPostsController = getPostsController;
const updatePostController = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const { email, ...updatedPostInfo } = req.body;
        const post = await (0, post_service_2.findPostById)(postId);
        if (!post) {
            res.status(404).json("Post not found");
            return;
        }
        const updatedPost = await (0, post_service_2.updatePostById)(postId, updatedPostInfo);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json(error.message);
        next(error);
    }
};
exports.updatePostController = updatePostController;
const deletePostController = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = await (0, post_service_2.findPostById)(postId);
        if (!post) {
            res.status(404).json("Post not found");
            return;
        }
        await (0, post_service_2.deletePostById)(postId);
        res.status(200).json("Post deleted successfully");
    }
    catch (error) {
        res.status(500).json(error.message);
        next(error);
    }
};
exports.deletePostController = deletePostController;
