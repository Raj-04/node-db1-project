const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // const { name, budget } = req.body
  // if(!name || !budget) {
  //   next({
  //     status: 400,
  //     message: 'name and budget are required'
  //   })
  // } else if(typeof name !== 'string') {
  //   next({
  //     status: 400,
  //     message: 'name of account must be a string'
  //   })
  // } else if(name.trim().length < 3 || name.trim().length > 100) {
  //   next({
  //     status: 400,
  //     message: 'name of account must be between 3 and 100'
  //   })
  // } else if(typeof budget !== 'number' || isNaN(budget)) {
  //   next({
  //     status: 400,
  //     message: 'budget of account must be a number'
  //   })
  // } else if(budget < 0 || budget > 1000000) {
  //   next({
  //     status: 400,
  //     message: 'budget of account is too large or too small'
  //   })
  // } else if(name && typeof budget === 'number') {
  //   req.validatedAccount = {
  //     ...req.body,
  //     name: name.trim()
  //   }
  //   next()
  // }
  if (!req.body.name || req.body.budget === undefined) {
    next({ status: 400, message: "name and budget are required" });
  } else if (typeof req.body.name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  } else if (typeof req.body.budget !== "number") {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (!req.body.name.trim()) {
    next({ status: 400, message: "name and budget are required" });
  } else if (3 > req.body.name.trim().length  || req.body.name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if(req.body.budget < 0 || req.body.budget >1000000){
    next({ status: 400, message: "budget of account is too large or too small"  });
  } else if(req.body.name && typeof req.body.budget === 'number') {
    req.validatedAccount = {
      ...req.body,
      name: req.body.name.trim()
    }
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim()
  const accounts = await Accounts.getAll()
  const isRepeated = accounts.find( account => account.name === name )
  if(isRepeated) {
    next({
      status: 400,
      message: 'that name is taken'
    })
  } else {
    next()
  }
}

exports.checkAccountId = async  (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    if(account) {
      req.account = account
      next()
    } else {
      next({
        status: 404,
        message: 'account not found'
      })
    }
  } catch (err) {
    next(err)
  }
}
