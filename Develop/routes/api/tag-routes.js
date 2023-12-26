const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [{model: Product}],
  })
  .then((tags)=>{
    res.send(tags)
  }).catch(err => {
    if (err) {
      console.log(err);
    };
  });
});

router.get('/:id', (req, res) => {
  Tag.findAll({
    include: [{model: Product}],
    where: {
      id: req.params.id
    }
  })
  .then((tags)=>{
    res.send(tags)
  }).catch(err => {
    if (err) {
      console.log(err);
    };
  });
});


router.post('/', async (req, res) => {
  try {
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
