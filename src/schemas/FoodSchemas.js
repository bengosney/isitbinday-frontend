import * as Yup from 'yup';

export const ProductSchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  name: Yup.string().max(50, 'Too long').required('Required').ensure(),
  code: Yup.string().max(30, 'Too long').required('Required').ensure(),
  quantity: Yup.integer().default(1),
  brand: Yup.integer().required('Required').ensure(),
  unit_of_measure: Yup.integer(),
  categories: Yup.array().of(Yup.integer()),
});

export const StockSchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  added: Yup.date(),
  state: Yup.mixed().oneOf(['In Stock', 'Consumed', 'Transferred', 'Removed']),
  state_changed: Yup.date(),
  expires: Yup.date().nullable(),
  quantity: Yup.number(),
  location: Yup.integer(),
  unit_of_measure: Yup.integer().nullable(),
  product: Yup.integer(),
});

export const CategorySchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  name: Yup.string().max(50, 'Too long').required('Required').ensure(),
});

export const UnitOfMeasureSchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  name: Yup.string().max(50, 'Too long').required('Required').ensure(),
});

export const BrandSchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  name: Yup.string().max(50, 'Too long').required('Required').ensure(),
});

export const LocationSchema = Yup.object().shape({
  id: Yup.number().moreThan(-1).default(0),
  name: Yup.string().max(50, 'Too long').required('Required').ensure(),
  can_move_to: Yup.boolean(),
  default: Yup.boolean(),
});
