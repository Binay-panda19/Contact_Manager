// import asyncHandler from "async-error-handler";
import { Contact } from "../models/contacts.model.js";

//@desc Get all contacts
//@route GET /api/contacts
//@access public for now until authorisation
//private
const getContact = async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  return res.status(200).json(contacts);
};

//@desc create contacts
//@route POST /api/contacts
//@access public for now
//private
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "send the credentials properly" });
    }

    const contact = await Contact.create({ name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    console.log("Something went wrong with the creation", error);
    res.status(500).json({ message: "Contact not created" });
  }
};

//@desc Get the contact with id
//@route PUT /api/contacts/:id
//@access public for now
//private
const getContactWithId = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
};

//@desc Update contacts
//@route POST /api/contacts/:id
//@access public for now
//private
const updatecontact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user contacts "
    );
  }
  const updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedcontact);
};

//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access public for now
//private
const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user contacts "
    );
  }
  await Contact.remove();

  res
    .status(200)
    .json({ message: `Deleted contact with id : ${req.params.id}` });
};

export {
  getContact,
  createContact,
  getContactWithId,
  updatecontact,
  deleteContact,
};
