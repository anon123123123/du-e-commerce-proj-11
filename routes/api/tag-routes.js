const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res, next) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [{ model: Product }]
  }).catch(next)
  res.json(tags)
});

router.get('/:id', async (req, res, next) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagByID = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }]
  }).catch(next)
  res.json(tagByID)
});

router.post('/', async (req, res, next) => {
  // create a new tag
  await Tag.create({
    tag_name: req.body.tag_name
  }).then(success => res.json({ created: true })).catch(next)
});

router.put('/:id', async (req, res, next) => {
  // update a tag's name by its `id` value
  await Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: { id: req.params.id }
    }).then(result => res.json({ success: true, updated_name: req.body.tag_name })
    ).catch(next)
});

router.delete('/:id', async (req, res, next) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({deleted: true}))
  .catch(next)
});

module.exports = router;
