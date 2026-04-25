// Компонент для рендеру div-а "Форма профіля"
import { updateMe } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";

const schemaUserForm = yup.object().shape({
  name: yup.string().required("Ім'я обов'язкове"),
  gender: yup.string().oneOf(["boy", "girl", "null", ""], "Оберіть стать"),
  dueDate: yup
    .date()
    .min(new Date(), "Дата має бути в майбутньому")
    .required("Дата обов'язкова"),
});

type GenderChildren = "boy" | "girl" | "null";

interface ProfileEditFormProps {
  user: User | null;
}

interface FormDataValues {
  name: string;
  email: string;
  gender: GenderChildren;
  dueDate: string;
}

const optionsForForm = [
  { value: "null", label: "Ще не знаю" },
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
];

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success("Дані успішно оновлено");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = async (values: FormDataValues) => {
    mutation.mutate({
      name: values.name,
      gender: values.gender === "null" ? "" : values.gender,
      dueDate: values.dueDate,
    });
  };

  const initialValues: FormDataValues = {
    name:user?.name?? 'Дані не отримано',
      email:user?.email ?? '',
    gender:user?.gender ?? 'null'
    dueDate: user?.dueDate ?? '',
  };

  return (
    <Formik <FormDataValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schemaUserForm}
      enableReinitialize>
      {({ values, setFieldValue, resetForm, dirty }) => (
        <Form className={css}>
          <div className={css}>
            <label htmlFor="">Імʼя</label>
            <Field />
            <ErrorMessage/>
          </div>
        </Form>
      )}
      
    </Formik>
  )
}
