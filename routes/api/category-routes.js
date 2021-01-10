const router = require("express").Router();
const e = require("express");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const cat = await Category.findAll({
    include: Product,
  });
  res.json(cat);
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const catId = await Category.findByPk(req.params.id, { include: Product });
  if (!catId) {
    res.sendStatus(404);
  } else {
    res.json(catId);
  }

  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  const newCat = await Category.create(req.body);
  res.status(201).json(newCat);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const renewCat = await Category.findByPk(req.params.id, { include: Product });
  if (!renewCat) {
    res.sendStatus(404);
  } else {
    await renewCat.update(req.body);
    res.json(renewCat);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deadCat = await Category.findByPk(req.params.id);
  if (!deadCat) {
    res.sendStatus(404);
  } else {
    await deadCat.destroy();
    res.sendStatus(204);
  }
});

module.exports = router;
