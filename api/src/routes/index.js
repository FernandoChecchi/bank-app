const { Router } = require("express");

const { Account } = require("../db")

//----------------------------------------------------------------------------//
//---------------------------MODULES-IMPORTS----------------------------------//
//----------------------------------------------------------------------------//
const userPath = require("./path/user")

//----------------------------------------------------------------------------//
//-----------------------MIDDLEWARES-FUNCIONAL--------------------------------//
//----------------------------------------------------------------------------//
const router = Router();

//----------------------------------------------------------------------------//
//-----------------------MIDDLEWARES-ROUTES-----------------------------------//
//----------------------------------------------------------------------------//


router.use('/user', userPath)





//invalidar rutas, es solo de prueba
/* router.get('/create/account',(req, res) => {
    Account.create()
        .then(
            account => res.send(account),
            err => res.send(err)
        )
})
router.get('/create/user', (req, res) => {
    Account.create({
            firstName: 'tomas',
            lastName: 'vasquez',
            email: 'tomasbenjamin117@gmail.com',
            documentType: 'DNI',
            documentNumber: 43598434,
            phoneNumber: 01125336221,
            address: 'tu vieja 123',
            password: 'asdasd',
        })
        .then(
            account => res.send(account),
            err => res.send(err)
        )
}) */


module.exports = router;