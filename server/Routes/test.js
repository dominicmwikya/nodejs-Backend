const express = require('express')
const Router = express.Router();
 
class Post {
     
    constructor() {
 
        this.state = {
            id: 1
        };
 
        Router.get('/:id', this.getPost); 
        Router.post('/:id', this.setPost);
 
    }
 
    getPost = (req, res) => {
       res.json(
            {
                response: "get",
                id: this.state.id
            }
        );
    }
 
    setPost = (req, res) => {
 
        this.state.id = req.params.id;
 
        res.json(
            {
                response: "post",
                id: this.state.id
            }
        );
    }
 
}
 
new Post();
 
module.exports = Router;