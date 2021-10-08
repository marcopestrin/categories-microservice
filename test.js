import mongoose from "mongoose";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "./index.js";

let should = chai.should();
chai.use(chaiHttp);

before(function(done) {
    // delete all items in the collection
    mongoose.connect('mongodb://localhost:27017/categories-microservice', function() {
        mongoose.connection.db.dropDatabase(function(){
            done()
        })
    });
});

let idCategory1;
let idCategory2;
let idProduct;
let categoryName1 = "travel";
let categoryName2 = "food";
let payload = {};

describe('Category', () => {
    describe('Add a new category', () => {
        it("Category 1 created", (done) => {
            payload = { name: categoryName1 };
            chai.request(server)
                .put(`/addCategory`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    idCategory1 = res.body.id
                    done();
                })
        })
        it("Category 2 created", (done) => {
            payload = { name: categoryName2 };
            chai.request(server)
                .put(`/addCategory`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    idCategory2 = res.body.id
                    done();
                })
        })
    })
    describe('Check category', () => {
        it("Category found", (done) => {
            chai.request(server)
                .get(`/getCategoryById/${idCategory1}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    done();
                })
        })
    })
    describe('Check list categories', () => {
        it("Categories list", (done) => {
            chai.request(server)
                .get(`/getCategories`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array').to.have.deep.members([{
                        name: categoryName1,
                        productCount: 0,
                        id: idCategory1
                    },{
                        name: categoryName2,
                        productCount: 0,
                        id: idCategory2
                    }])
                    done();
                })
        })
    })   
})

describe('Product', () => {
    describe('Add a new product', () => {
        it("Category created", (done) => {
            payload = {
                name: 'taccuino',
                price: 13,
                category: categoryName1
            };
            chai.request(server)
                .put(`/addProduct`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    idProduct = res.body.id
                    done();
                })
        })
    })
    describe('Check product exist', () => {
        it("Product found", (done) => {
            chai.request(server)
                .get(`/getProductById/${idProduct}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('price');
                    res.body.should.have.property('category');
                    done();
                })
        })
    })
})

describe("Category", () => {
    describe('Attempt to delete a populated category', () => {
        it("Impossibile to remove a category", (done) => {
            chai.request(server)
                .delete(`/deleteCategory/${idCategory1}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    expect(res.body).to.have.property('error');
                    done();
                })
        })
    })
})

describe('Product', () => {
    
    describe('Try to edit a product', () => {
        it("Modified Product", (done) => {
            payload = {
                name: "pen",
                price: 3,
                category: categoryName2
            }
            chai.request(server)
                .post(`/editProduct/${idProduct}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.property('category', categoryName2);
                    done()
                })
        })
    })
    describe('List Products', () => {
        it("Successful product list", (done) => {
            payload = {
                name: "pen",
                price: 3,
                category: categoryName2 
            }
            chai.request(server)
                .get(`/getProducts`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done()
                })
        })
    })     
    describe('Delete Product', () => {
        it("Product removed", (done) => {
            chai.request(server)
                .delete(`/deleteProduct/${idProduct}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("deletedCount");
                    done()
                })
        })
    })

    describe('Now the product should no longer exist ', () => {
        it("Not found", (done) => {
            chai.request(server)
                .get(`/getProductById/${idProduct}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.property('success', false);
                    done();
                })
        })
    })
})

describe("Category", () => {
    describe('Try to delete an empty category', () => {
        it("Category Removed", (done) => {
            chai.request(server)
                .delete(`/deleteCategory/${idCategory1}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.property('deletedCount');
                    done();
                })
        })
    })
})