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

router.put('/:id', (req, res, next) => {
  
});

router.delete('/:id', (req, res, next) => {

})

router.use((err, req, res, next) => { // eslint-disable-line
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
