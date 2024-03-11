const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

//@desc Get contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ msg: "Get all contacts", data: contacts });
});

//@desc Create New contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json({ created: contact });
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Cannot found");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("Unauthorize user cannot see contacts");
  }

  res.status(200).json({ contact });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Cannot found");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("Unauthorize user cannot see contacts");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ updated: updateContact });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Cannot found");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("Unauthorize user cannot see contacts");
  }

  const deleteContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json({ deleted: deleteContact });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
