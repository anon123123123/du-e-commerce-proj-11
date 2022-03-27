const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res, next) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{ model: Product }]
  }).catch(next)
  res.json(categories)
});

router.get('/:id', async (req, res, next) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryByID = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  }).catch(next)
  res.json(categoryByID)
});

router.post('/', async (req, res, next) => {
  // create a new category
  await Category.create({
    category_name: req.body.category_name
  }).then(success => res.json({ created: true })).catch(next)
});

router.put('/:id', async (req, res, next) => {
  // update a category by its `id` value
  await Category.update({
    category_name: req.body.category_name
  },
    {
      where: { id: req.params.id }
    }).then(result => res.json({ success: true, updated_name: req.body.category_name })
    ).catch(next)
});

router.delete('/:id', async (req, res, next) => {
  // delete a category by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({deleted: true}))
  .catch(next)
});

module.exports = router;
