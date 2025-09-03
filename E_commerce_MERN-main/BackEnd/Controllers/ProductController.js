import ProductModel from '../Models/ProductsSchema.js'

const addProduct = async (req, res) => {
  try{
    const { title, price, description, rating, category, image_link, product_link } = req.body;
   

    const existingProduct = await ProductModel.findOne({ title });
    if(existingProduct){
      return res.status(400).json({ 
        message: "Product already exists", 
        existingProduct 
      });
    }
    
    
    let image = '';
    if (req.file) {
      image = req.file.filename; 
    }
    
   
    const product = await ProductModel.create({ 
      title, 
      price, 
      description, 
      rating, 
      image, 
      image_link, 
      product_link, 
      category 
    });
    
    return res.status(201).json({ 
      message: "Product added successfully", 
      product 
    });
  }
  catch(error){
    console.error('Error adding product:', error);
    return res.status(500).json({ message: error.message });
  }
}
const  listProducts = async (req, res) => {
  try{
    const products = await ProductModel.find();
    return res.status(200).json({ products });
 
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
const removeProduct = async (req, res) => {
  try{
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully", product });
 
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
const singleProduct = async (req, res) => {
  try{
    const { id } = req.params;
    const product = await ProductModel.findById(id);
       
    if (!product) {
      return res.status(404).json({ 
        message: "Product not found" 
      });
    }
    else{
      return res.status(200).json({ product });
    }
   
  }
  catch(error){
    console.error('Error fetching single product:', error);
    return res.status(500).json({ message: error.message });
  }
}
const updateProduct = async (req, res) => {
  try{
    const { id } = req.params;
    const { title, price, description, rating, category, image_link, product_link } = req.body;
    const product = await ProductModel.findByIdAndUpdate(id, { title, price, description, rating, category, image_link, product_link }, { new: true });
    return res.status(200).json({ message: "Product updated successfully", product });

  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}

export { addProduct, listProducts, removeProduct, updateProduct, singleProduct }