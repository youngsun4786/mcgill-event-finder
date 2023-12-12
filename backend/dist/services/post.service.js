"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostById = exports.deletePostById = exports.findPostById = exports.posts = exports.createPost = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const createPost = async (email, postInfo) => {
    try {
        const user = await models_1.UserModel.findOne({ email: email }).exec();
        if (!user)
            return false;
        const post = await models_1.PostModel.create({
            author: user.id,
            ...postInfo,
        });
        return post;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createPost = createPost;
const posts = async () => {
    try {
        const posts = await models_1.PostModel.find()
            .populate({ path: "author", select: "-password" })
            .lean()
            .exec();
        return posts;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.posts = posts;
const findPostById = async (id) => {
    try {
        const postId = new mongoose_1.Types.ObjectId(id);
        const post = await models_1.PostModel.findById({ _id: postId }).lean().exec();
        return post;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.findPostById = findPostById;
const deletePostById = async (id) => {
    try {
        const postId = new mongoose_1.Types.ObjectId(id);
        return await models_1.PostModel.findByIdAndDelete({ _id: postId }).lean().exec();
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.deletePostById = deletePostById;
const updatePostById = async (id, post) => {
    try {
        const postId = new mongoose_1.Types.ObjectId(id);
        const updatedPost = await models_1.PostModel.findOneAndUpdate({ _id: postId }, post, {
            new: true,
        })
            .lean()
            .exec();
        return updatedPost;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updatePostById = updatePostById;
