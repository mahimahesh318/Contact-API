import express from 'express'
import { deleteContactById, getAllContact, getContactById, getContactByUserId, newContact, updateContactById } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middleware/Auth.js';

const router = express.Router();

//new contact
//@api description : creating contact
//@api method : post
//@api endPoint : /api/contact/new


router.post('/new',isAuthenticated,newContact);

//get all contacts
router.get('/',getAllContact);

//get contact by id
router.get('/:id', getContactById);

//update contact by id
router.put('/:id',isAuthenticated,updateContactById);

//delete contact by id
router.delete('/:id',isAuthenticated,deleteContactById);

//get user by user id
router.get('/userid/:id',getContactByUserId);

export default router;