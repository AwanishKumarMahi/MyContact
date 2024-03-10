const asyncHandler = require("express-async-handler")

//@desc Get contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
  res.status(200).json({ msg: "Get all contacts" });
});

//@desc Create New contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
    const {name, email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory.")
    }
    console.log("The request body: ",req.body)
    res.status(201).json({ msg: "Create contacts" });

});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
  res.status(200).json({ msg: `Get contact for ${req.params.id}` });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) => {
  res.status(200).json({ msg: `Update contact for ${req.params.id}` });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
  res.status(200).json({ msg: `Deleting contact for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
