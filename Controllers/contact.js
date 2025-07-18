import { Contact } from "../Models/Contact.js";

//get all contact
export const getAllContact = async (req,res) =>{

  const userContact = await Contact.find();

  if(!userContact)
    return res.json({message : "No Contact Exists...", success : false});

  res.json({message : "All Contacts Fetched...", userContact});
  
}

//create new contact
export const newContact = async (req,res) =>{

  const {name,email,phone,type} = req.body;

  if(name == "" ||email == "" || phone == "" || type == "")
    return res.json({message : "All fields are required...", success :  false})

  let saveContact = await Contact.create({name,email,phone,type,user:req.user});
  res.json({message : "Contact saved successfully...",saveContact, success : true});

}

//get contact by id
export const getContactById = async (req,res) =>{
  
  const id = req.params.id;
  
  const userContact = await Contact.findById(id);

  if(!userContact) 
    return res.json({message : "No Contact Find...", success : false})

  res.json({message : "Contact Fetched...", userContact, success : true })

}

//update contact by id
export const updateContactById = async (req,res) =>{
  
  const id = req.params.id;
  const {name,email,phone,type} = req.body;
  let updatedContact = await Contact.findByIdAndUpdate(id,{name,email,phone,type},{new : true});

  if(!updatedContact)
    return res.json({message : "No contact exists...", success : false});

  return res.json({message : "Contact Upadated Successfully...", updatedContact, success : true});

}

//delete contact by id
export const deleteContactById = async (req,res) =>{

  const id = req.params.id;

  let deleteContact = await Contact.findByIdAndDelete(id);

  if(!deleteContact)
    return res.json({message : "No contact exists...", success : false});

  return res.json({message : "Contact deleted Successfully...", success : true});

}

//get contact by user id

export const getContactByUserId = async (req,res) => {

  const id = req.params.id;

  const userContact = await Contact.find({user : id});
  if(!userContact)
    return res.json({message : "No Contact Find" , success : false});

  res.json({message : "User Specific Contact Fetched", userContact,success : true});
  
}