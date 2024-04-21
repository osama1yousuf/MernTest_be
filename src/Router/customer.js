import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomers, getSingleCustomer, updateCustomer } from "../Controller/customer.js";

const router = Router();

router.get('/customers', getAllCustomers)
// router.get('/customer/:id', getSingleCustomer)
router.get('/customer/:id', getSingleCustomer)
router.post('/customer', createCustomer)
router.put('/customer/:id', updateCustomer)
router.delete('/customer/:id', deleteCustomer)

export default router