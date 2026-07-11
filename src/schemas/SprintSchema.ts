import * as Yup from 'yup';

export const STATE_PLANNING = 'planning';
export const STATE_IN_PROGRESS = 'in progress';
export const STATE_FINISHED = 'finished';
export const STATE_CANCELED = 'canceled';

export const STATES = [STATE_PLANNING, STATE_IN_PROGRESS, STATE_FINISHED, STATE_CANCELED];

export const SprintSchema = Yup.object().shape({
  title: Yup.string().max(255, 'Too long').required('Required').ensure(),
  started: Yup.date(),
  finished: Yup.date(),
  tasks: Yup.object(),
});
