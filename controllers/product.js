const Products = require('../models/product');

exports.createProduct = (req,res)=>{
    const body = req.body ;
    const product = new Products({...body})
    product.save()
.then(product =>  res.status(201).json({ product}))
.catch(error => res.status(400).json({ error }));
};

exports.getAllProducts = (req,res)=>{
    const products =  Products.find()
    .then(products => res.status(200).json({products}))
    .catch(error => res.status(400).json({ error }));
};

exports.getById = async (req, res) => {
    try {
      const product = await Products.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateProduct = (req,res)=>{
    const body = req.body ;
    const id = req.params.productId ;
    Products.findOneAndUpdate({_id:id},{...body})
    .then(  res.status(200).json({ message: 'Modified!' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct= (req,res)=>{
    const id = req.params.productId ;
    Products.deleteOne({_id:id})
    .then(  res.status(200).json({ message: 'Deleted!' }))
    .catch(error => res.status(400).json({ error }));
};