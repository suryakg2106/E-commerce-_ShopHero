import ProductSchema from "../Models/ProductModel.js";


// Create a product
export const CreateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      isFeatured,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        Success: false,
        msg: "At least one product image is required",
      });
    }

    if (discountPrice && Number(discountPrice) >= Number(price)) {
      return res.status(400).json({
        Success: false,
        msg: "Discount price must be less than price",
      });
    }

    const images = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
    }));

    const product = await ProductSchema.create({
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      isFeatured,
      images,
      owner: req.user._id,
    });

    // 5️⃣ Response
    res.status(201).json({
      Success: true,
      msg: "Product created successfully",
      product: {
        ...product._doc,
        images: product.images.map((img) => ({
          url: `http://localhost:3000${img.url}`,
        })),
      },
    });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR 👉", error);
    res.status(400).json({
      Success: false,
      msg: "Failed to create product",
      error: error.message,
    });
  }
};


// All product view 

export const getAllProduct = async (req, res) => {
  try {
    const {
      brand,
      category,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 28,
    } = req.query;

    let query = {};

    if (brand) {
      query.brand = { $regex: `^${brand}$`, $options: "i" };
    }

    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await ProductSchema.find(query)
      .populate("owner", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await ProductSchema.countDocuments(query);

    const formattedProducts = products.map((p) => ({
      ...p._doc,
      images: p.images.map((img) => ({
        url: `http://localhost:4000${img.url}`,
      })),
    }));

    res.status(200).json({
      Success: true,
      msg: "Products fetched successfully",
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      Products: formattedProducts,
    });
  } catch (error) {
    console.log("GET ALL PRODUCT ERROR 👉", error);
    res.status(500).json({
      Success: false,
      msg: "Failed to get all product",
    });
  }
};


// get product by id

export const getProductbyId = async (req,res) => {

    try {
        const Produ = await ProductSchema.findById(req.params.id).populate("owner", "name email");
        if(!Produ){
            return res.status(200).json({success:false, message:"Product Not Found"});
        }
        res.status(200).json({success:true, message:Produ});
    } catch (error) {
        res.status(500).json({
            success:false, message:error.message
        })
    }
    
}

// update product 

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      isFeatured,
    } = req.body;

    // 🔹 Discount validation
    if (discountPrice && Number(discountPrice) >= Number(price || product.price)) {
      return res.status(400).json({
        success: false,
        message: "Discount price must be less than price",
      });
    }

    // 🔹 Update fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.stock = stock ?? product.stock;
    product.isFeatured = isFeatured ?? product.isFeatured;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
      }));
      product.images = newImages; // or push if you want append
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: {
        ...product._doc,
        images: product.images.map((img) => ({
          url: `http://localhost:4000${img.url}`,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My product 

export const MyProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const products = await ProductSchema.find({ owner: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products: products.map((product) => ({
        ...product._doc,
        images: product.images.map((img) => ({
          url: `http://localhost:4000${img.url}`,
        })),
      })),
    });

  } catch (error) {
    console.log("MY PRODUCT ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your products",
      error: error.message,
    });
  }
};

// Product Details Pages.
export const ProductDeatils = async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 make image URLs absolute
    const formattedProduct = {
      ...product._doc,
      images: product.images.map((img) => ({
        url: `http://localhost:4000${img.url}`,
      })),
    };

    return res.status(200).json({
      success: true,
      product: formattedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await ProductSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


















