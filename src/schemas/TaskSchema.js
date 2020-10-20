import * as Yup from 'yup';

export const STATE_DRAFT = 'draft';
export const STATE_TODO = 'todo';
export const STATE_DOING = 'doing';
export const STATE_DONE = 'done';
export const STATE_CANCELED = 'canceled';

export const STATES = [STATE_DRAFT, STATE_TODO, STATE_DOING, STATE_DONE, STATE_CANCELED];

export const TaskSchema = Yup.object().shape({
  id: Yup.number().moreThan(0).default(0),
  title: Yup.string().max(255, 'Too long').required('Required').ensure(),
  due_date: Yup.date().nullable(),
  effort: Yup.number().moreThan(0).nullable(),
  blocked_by: Yup.string().url().ensure(),
  repeats: Yup.string().ensure().default(''),
});
