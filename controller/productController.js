import schema from "../models/product.js";
import crypto from "crypto";

import {
    createItem,
    readItem,
    updateItem,
    deleteItem,
    getAllItems,
    existCategory
} from "./services.js";

export const getProducts = async(req, res) => {
    try {
        const result = await getAllItems(schema);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const getProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await readItem(id, schema);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

export const editProduct = async(req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const { name, price, category } = req.body;
            if (await existCategory(category)) {
                const payload = { name, price, category, id };
                const result = await updateItem(payload, schema);
                return res.status(200).json(result);    
            }
            throw "Category doesn't exist";
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export const addProduct = async(req, res) => {
    try {
        const { name, price, category } = req.body;
        const id = crypto.createHash("md5")
            .update(name.concat(new Date().getTime()))
            .digest("hex");
        if (await existCategory(category)) {
            const payload = { id, name, price, category };
            const result = await createItem(payload, schema);
            if (result) {
                return res.status(200).json(result);
            }
            throw "Impossibile create a new product";
        }
        
        throw "Category doesn't exist";
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }


}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteItem(id, schema);
        if (result) {
            return res.status(200).json(result);
        }
        throw "Impossible to delete this product";
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}