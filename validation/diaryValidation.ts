import * as Yup from 'yup'
import { format } from 'date-fns'

const today = format(new Date(), 'yyyy-MM-dd')

export const diaryValidationSchema = Yup.object({
  title: Yup.string()
    .min(1, "Заголовок не може бути порожнім")
    .max(64, "Максимум 64 символи")
    .required("Заголовок обов'язковий"),

  description: Yup.string()
    .min(1, "Запис не може бути порожнім")
    .max(1000, "Максимум 1000 символів")
    .required("Запис обов'язковий"),

  date: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Невірний формат дати")
    .default(today),

  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, "Оберіть хоча б одну емоцію")
    .max(12, "Максимум 12 емоцій")
    .required("Оберіть хоча б одну емоцію"),
})

export const diaryInitialValues = {
  title: '',
  description: '',
  date: today,
  emotions: [] as string[],
}