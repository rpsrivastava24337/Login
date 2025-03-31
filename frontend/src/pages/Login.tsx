import * as z from "zod";

const loginSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Example usage of LoginFormValues
const handleSubmit = (values: LoginFormValues) => {
  console.log("Form submitted with values:", values);
};

// Example form usage
export const LoginForm = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const formValues: LoginFormValues = { uid: "exampleUID", password: "examplePassword" };
      handleSubmit(formValues);
    }}
  >
    <button type="submit">Submit</button>
  </form>
);
