import schema from "../models/category.js";
import crypto from "crypto";
import { getCountByCategory } from "../helpers/index.js"

import { createItem, readItem, getAllItems } from "./services.js";

export const getCategories = async(req, res)  => {
    const categories = await getAllItems(schema);
    const payload = await Promise.all(categories.map(async(category) => {
        const { name, id } = category;
        const productCount = await getCountByCategory(name);
        return { name, id, productCount }
    }))
    res.status(200).json(payload);
}

export const getCategoryById = async(req, res)  => {
    const { id } = req.params;
    const result = await readItem(id, schema);
    res.status(200).json(result);
}

export const addCategory = async(req, res)  => {
    const { name } = req.body;
    const id = crypto.createHash("md5")
        .update(name)
        .digest("hex");
    const payload = { id, name };
    const result = await createItem(payload, schema);
    res.status(200).json(result);
}
