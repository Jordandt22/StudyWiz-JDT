// Sets Validation Schemas
import * as Yup from "yup";

// Term
const TermSchema = Yup.object().shape({
  term: Yup.string()
    .trim()
    .min(1, "Term must be between 1-100 characters.")
    .max(100, "Term must be between 1-100 characters.")
    .required("A term is required."),
  definition: Yup.string()
    .trim()
    .min(1, "Term must be between 1-1000 characters.")
    .max(1000, "Term must be between 1-1000 characters.")
    .required("A definition is required."),
});

// Set
export const SetSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(1, "Must enter a title for your voacb set.")
    .max(100, "Your title must be less than 100 characters.")
    .required("Must enter a title for your voacb set."),
  privacy: Yup.object().shape({
    hideCreator: Yup.boolean().required(),
    private: Yup.boolean().required(),
  }),
  terms: Yup.array()
    .min(1, "Must have atleast 1 term to create a set.")
    .max(50, "The max number of terms is 50 per set.")
    .of(TermSchema)
    .required("Must have atleast 1 term to create a set."),
});
