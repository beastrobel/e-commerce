const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [{model: Product}],
  })
  .then((categories)=>{
    res.send(categories)
  }).catch(err => {
    if (err) {
      console.log(err);
    };
  });
});

router.get('/:id', (req, res) => {
  Category.findAll({
  include: [{model: Product}],
  where: {
    id: req.params.id
  }
  })
  .then((category) => {
    res.json(category);
  });
});

router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
