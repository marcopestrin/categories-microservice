import {
    getCategories,
    getCategoryById,
    addCategory
} from "../controller/categoryController.js";
import {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
} from "../controller/productController.js";
import { 
    getPosts,
    getPostById,
    addPost,
    editPost,
    deletePost
} from "../controller/postController.js";

export default function initializeSwagger(router) {
    router.get("/getProducts", getProducts); //ok
    router.get("/getPosts", getPosts);
    router.get("/getCategories", getCategories); //ok

    router.get("/getProductById/:id", getProductById); //ok
    router.get("/getPostById/:id", getPostById);
    router.get("/getCategoryById/:id", getCategoryById); //ok

    router.put("/addPost", addPost);
    router.put("/addCategory", addCategory); //ok
    router.put("/addProduct", addProduct); //ok

    router.post("/editPost/:id", editPost);
    router.post("/editProduct/:id", editProduct); //ok

    router.delete("/deletePost", deletePost);
    router.delete("/deleteProduct/:id", deleteProduct); //ok
}