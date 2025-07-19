import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContactWithId,
  updatecontact,
} from "../controllers/contact.controller.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.use(validateToken);
// Define a route for the contact page
router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(getContactWithId)
  .put(updatecontact)
  .delete(deleteContact);

export default router;
