import account from "../schemas/account";
import categorySchema from "../schemas/categorySchema";
import homeSchema from "../schemas/homeSchema";
import packagesSchema from "../schemas/packageSchema";
import plateFormSchema from "../schemas/plateFormSchema";
import subCategorySchema from "../schemas/subCategorySchema";
import user from "../schemas/user";
import verificationToken from "../schemas/verificationToken";

export const schemaTypes = [
  user,
  account,
  verificationToken,
  homeSchema,
  categorySchema,
  subCategorySchema,
  packagesSchema,
  plateFormSchema,
];
