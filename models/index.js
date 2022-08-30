// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
	foreignKey: "category_id",
	onDelete: "SET NULL",
});

// Categories have many Products
Category.hasMany(Product, {
	foreignKey: "product_id",
	onDelete: "SET NULL",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
	through: ProductTag,
	//does this need an as? - if so, how do I know the name?
	as: "productTag_product",
	foreignKey: "product_id",
	onDelete: "SET NULL",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
	through: ProductTag,
	//does this need an as?
	as: "productTag_product",
	foreignKey: "tag_id",
	onDelete: "SET NULL",
});

module.exports = {
	Product,
	Category,
	Tag,
	ProductTag,
};
