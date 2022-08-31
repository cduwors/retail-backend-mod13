const router = require("express").Router();
const { Category, Product } = require("../../models");
// const { findAll } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	// be sure to include its associated Products
	Category.findAll({
		// attributes: ["id", "category_name"],
		include: [Product],
		// 	{
		// 		model: Product,
		// 		attributes: ["id", "product_name", "price", "stock", "category_id"],
		// 	},
		// ],
	})
		.then((dbCategoryData) => res.json(dbCategoryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	Category.findOne({
		where: {
			id: req.params.id,
		},
		// attributes: ["id", "category_name"],
		include: [
			Product,
			// {
			// 	model: Product,
			// 	attributes: ["id", "product_name", "price", "stock", "category_id"],
			// },
		],
	})
		.then((dbCategoryData) => {
			// if (!dbCategoryData) {
			// 	res.status(404).json({ message: "No category found with this id" });
			// 	return;
			// }
			res.json(dbCategoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.post("/", (req, res) => {
	// create a new category
	Category.create(req.body)
		.then((dbCategoryData) => res.status(200).json(dbCategoryData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(req.body, {
		// individualHooks: true,
		where: {
			id: req.params.id,
		},
	})
		.then((dbCategoryData) => {
			// if (!dbCategoryData) {
			// 	res.status(404).json({ message: "No Category found with this id" });
			// 	return;
			// }
			res.status(200).json(dbCategoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCategoryData) => {
			// if (!dbCategoryData) {
			// 	res.status(404).json({ message: "No Category found with this id" });
			// 	return;
			// }
			res.status(200).json(dbCategoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

module.exports = router;
