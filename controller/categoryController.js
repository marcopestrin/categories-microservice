import schema from "../models/category.js";
import crypto from "crypto";
import { getCountByCategory } from "../helpers/index.js"

import { createItem, readItem, getAllItems, deleteItem } from "./services.js";

export const getCategories = async(req, res)  => {
    try {
        const categories = await getAllItems(schema);
        const payload = await Promise.all(categories.map(async(category) => {
            const { name, id } = category;
            const productCount = await getCountByCategory(name);
            return { name, id, productCount }
        }))
        res.status(200).json(payload);
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error });
    }
}

export const getCategoryById = async(req, res)  => {
    try {
        const { id } = req.params;
        const result = await readItem(id, schema);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const addCategory = async(req, res) => {
    try {
        const { name } = req.body;
        const id = crypto.createHash("md5")
            .update(name)
            .digest("hex");
        const payload = { id, name };
        const result = await createItem(payload, schema);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const deleteCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = await readItem(id, schema);
        const productCount = await getCountByCategory(name);
        // da fare anche con i post!!!
        if (!productCount) {
            const result = await deleteItem(id, schema);
            if (result) {
                return res.status(200).json(result);
            }
        }
        throw "Catergory is not empty. Impossible to delete";
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
 
}