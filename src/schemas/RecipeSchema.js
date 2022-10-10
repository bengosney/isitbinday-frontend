import * as Yup from 'yup';

export const RecipeSchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  name: Yup.string().max(30, 'Too long').required('Required').ensure(),
  time: Yup.number().moreThan(-1).default(0),
  description: Yup.string().max(512, 'Too long'),
  link: Yup.string(),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().max(30, 'Too long').required('Required').ensure(),
        quantity: Yup.number().moreThan(0).default(0),
        unit: Yup.string().max(30, 'Too long').required('Required').ensure(),
      })
    )
    .ensure(),
});
