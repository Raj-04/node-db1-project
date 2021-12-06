const router = require('express').Router()
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require('./accounts-middleware')
const Accounts = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  try {
    const account = req.account
    res.status(200).json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.validatedAccount)
    res.status(201).json(newAccount)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.validatedAccount)
    res.status(200).json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedPost = await Accounts.deleteById(req.params.id)
    res.json(deletedPost)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
