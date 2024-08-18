import * as Yup from 'yup';

export const BookSyncSchema = Yup.object().shape({
    id: Yup.number().moreThan(-1).default(0),
    server: Yup.string().max(255, 'Too long').default(""),
    database: Yup.string().max(255, 'Too long').default(""),
    username: Yup.string().max(255, 'Too long').default(""),
    password: Yup.string().max(255, 'Too long').default(""),
    last_sync: Yup.string().max(255, 'Too long').default(""),
});