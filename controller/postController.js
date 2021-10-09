import schema from "../models/post.js";
import crypto from "crypto";
import { showErrorInCli } from "../config.js";
import {
    createItem,
    readItem,
    updateItem,
    deleteItem,
    getAllItems,
    existCategory
} from "./services.js";

export const getPosts = async(req, res)  => {
    try {
        const result = await getAllItems(schema);
        res.status(200).json(result);
    } catch (error) {
        if (showErrorInCli) {
            console.log(error);
        }
        res.status(500).json({ error });
    }
}
export const getPostById = async(req, res)  => {
    try {
        const { id } = req.params;
        const result = await readItem(id, schema);
        if (result) {
            return res.status(200).json(result);
        }
        throw "Post doesn't exist";
    } catch (error) {
        if (showErrorInCli) {
            console.log(error);
        }
        return res.status(500).json({ error })
    }
}
export const editPost = async(req, res)  => {
    try {
        const { id } = req.params;
        if (id) {
            const { title, body, category } = req.body;
            if (await existCategory(category)) {
                const payload = { title, body, category, id };
                const result = await updateItem(payload, schema);
                if (result) {
                    return res.status(200).json(payload);    
                }
                throw "Impossibile to update this post";
            }
            throw "Category doesn't exist";
        }
    
    } catch (error) {
        if (showErrorInCli) {
            console.log(error);
        }
        return res.status(500).json({ error });
    }
}
export const addPost = async(req, res)  => {
    try {
        const { title, body, category } = req.body;
        const id = crypto.createHash("md5")
            .update(title.concat(new Date().getTime()))
            .digest("hex");
        if (await existCategory(category)) {
            const payload = { id, body, category, title };
            const result = await createItem(payload, schema);
            if (result) {
                return res.status(200).json(result);
            }
            throw "Impossibile create a new post";
        }
        
        throw "Category doesn't exist";
    } catch (error) {
        if (showErrorInCli) {
            console.log(error);
        }
        return res.status(500).json({ error })
    }
}
export const deletePost = async(req, res)  => {
    try {
        const { id } = req.params;
        const result = await deleteItem(id, schema);
        if (result) {
            return res.status(200).json(result);
        }
        throw "Impossible to delete this post";
    } catch(error) {
        if (showErrorInCli) {
            console.log(error);
        }
        return res.status(500).json({ error });
    }
}
