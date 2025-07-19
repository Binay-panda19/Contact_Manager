import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContactWithId,
  updatecontact,
} from "../controllers/contact.controller.js";

const router = Router();

// Define a route for the contact page
router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(getContactWithId)
  .put(updatecontact)
  .delete(deleteContact);

export default router;
