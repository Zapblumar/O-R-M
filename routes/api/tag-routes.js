const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
    include: Product,
  });
  res.json(tags);
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tagId = await Tag.findByPk(req.params.id, { include: Product });
  if (!tagId) {
    res.sendStatus(404);
  } else {
    res.json(tagId);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.status(201).json(newTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const zombieTag = await Tag.findByPk(req.params.id, { include: Product });
  if (!zombieTag) {
    res.sendStatus(404);
  } else {
    await zombieTag.update(req.body);
    res.json(zombieTag);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const freezeTag = await Tag.findByPk(req.params.id);
  if (!freezeTag) {
    res.sendStatus(404);
  } else {
    await freezeTag.destroy();
    res.sendStatus(204);
  }
});

module.exports = router;
