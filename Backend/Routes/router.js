// Set up router from Express to handle route requests
const router = express.Router();

// Include the Products model to interact with the MongoDB database
const products = require('../Models/Products');

// Route to handle POST request for inserting a new product
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        // Check if the product with the same barcode already exists in the database
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            // Send a response back if the product already exists
            res.status(422).json("Product is already added.")
        }
        else {
            // Create a new product entry if no existing product is found
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

// Route to handle GET request for retrieving all products
router.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

// Route to handle GET request for retrieving a single product by its ID
router.get('/products/:id', async (req, res) => {
    try {
        // Fetch a single product based on ID from the database
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

// Route to handle PUT request for updating a product's information
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        // Update the specified product's details and return the new document
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

// Route to handle DELETE request for removing a product by ID
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        // Delete the specified product from the database
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})

// Export the router to be used in other parts of the application
module.exports = router;
