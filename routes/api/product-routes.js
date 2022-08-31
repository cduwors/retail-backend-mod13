const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
	// find all products
	Product.findAll({
		// attributes: ["id", "product_name", "price", "stock", "category_id"],

		include: [
			Category,
			{ model: Tag, through: ProductTag },
			// {
			// 	model: Category,
			// 	attributes: ["id", "category_name"],
			// },
		],
		// include: [
		// 	{
		// 		model: Tag,
		// 		attributes: ["tags"],
		// 	},
		// ],
	})
		.then((dbProductData) => res.json(dbProductData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	// be sure to include its associated Category and Tag data
});

// get one product
router.get("/:id", (req, res) => {
	// find a single product by its `id`
	Product.findOne({
		// attributes: ["id", "product_name", "price", "stock", "category_id"],
		where: {
			id: req.params.id,
		},
		include: [
			Category,
			{
				model: Tag,
				through: ProductTag,
			},
			// {
			// 	model: Category,
			// 	attributes: ["id", "category_name"],
			// },
		],
	})
		.then((dbProductData) => res.json(dbProductData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
	// be sure to include its associated Category and Tag data
});

// create new product
router.post("/", (req, res) => {
	Product.create(req.body)
		.then((product) => {
			if (req.body.tagIds && req.body.tagIds.length) {
				const productTagIdArr = req.body.tagIds.map((tag_id) => {
					return {
						product_id: product_id,
						tag_id,
					};
				});
				return productTag.bulkCreate(productTagIdArr);
			}
			res.status(200).json(product);
		})
		/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
		// 	product_name: req.body.product_name,
		// 	price: req.body.price,
		// 	stock: req.body.stock,
		// 	tagIds: req.body.tagIds,
		// });
		.then((dbProductTagIds) => res.status(200).json(dbProductTagIds))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// update product
router.put("/:id", (req, res) => {
	// update product data
	Product.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((product) => {
			if (req.body.tagIds && req.body.tagIds.length) {
				const productTags = ProductTag.findAll({
					where: {
						product_id: req.params.id,
					},
				});
				const productTagsIds = productTags.map(({ tag_id }) => tag_id);
				const newProductTags = req.body.tagIds
					.filter((tag_id) => !productTagIds.includes(tag_id))
					.map((tag_id) => {
						return {
							product_id: req.params.id,
							tag_id,
						};
					});

				//     return productTag.bulkCreate(productTagIdArr);
				//   }
				//   res.status(200).json(product)
				// })
				// 	// find all associated tags from ProductTag
				// 	return ProductTag.findAll({ where: { product_id: req.params.id } });
				// })
				// .then((productTags) => {
				// 	// get list of current tag_ids
				// 	const productTagIds = productTags.map(({ tag_id }) => tag_id);
				// 	// create filtered list of new tag_ids

				// 		});
				// figure out which ones to remove
				const productTagsToRemove = productTags
					.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
					.map(({ id }) => id);

				// run both actions
				return Promise.all([
					ProductTag.destroy({ where: { id: productTagsToRemove } }),
					ProductTag.bulkCreate(newProductTags),
				]);
			}
			return res.json(product);
			// .then((updatedProductTags) => res.json(updatedProductTags))
		})
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete one product by its `id` value
	Product.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbProductData) => {
			res.status(200).json(dbProductData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

module.exports = router;
