import { ToTitleCase } from '../utils/string';
import ErrorMessage from '../widgets/ErrorMessage';
import Loader from '../widgets/Loader';
import {
  Input,
  NativeSelect,
  Button,
  Checkbox,
  Textarea,
  RadioGroup,
  Stack,
  Text,
  Box,
  InputGroup,
} from '@chakra-ui/react';
import { useFormikContext, Field as FormikField, useField, Formik, FormikConfig, FormikValues } from 'formik';
import * as React from 'react';

interface OptionItem {
  key: string | number;
  value: unknown;
  text: string;
}

interface FieldProps {
  as: React.ElementType;
  children?: React.ReactNode;
  processor?: (props: Record<string, unknown>) => Record<string, unknown>;
  name?: string;
  label?: string | null;
  showLabel?: boolean;
  [key: string]: unknown;
}

const Field = ({ as, children, processor, name, label = null, showLabel = true, ...props }: FieldProps) => {
  const [field, meta] = useField(Object.assign(props as Record<string, unknown>, { name: name ?? '' }));
  const { error = null, touched } = meta;
  const _error = touched && error;
  const _label = label || ToTitleCase(name || 'broken');
  const extras: Record<string, unknown> = {
    name: name,
    label: _label,
    id: name,
  };

  const _processor = processor || ((p: Record<string, unknown>) => p);
  const newProps = { ...field, ...(props as Record<string, unknown>), ...extras };

  const element = React.createElement(as, _processor(newProps), children);

  const errors = error !== null ? <Text as="span">{` - ${error}`}</Text> : '';

  return (
    <Stack>
      <Box color={_error ? 'form.error' : ''}>
        {showLabel ? (
          <label
            htmlFor={name}
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, opacity: 0.75, marginBottom: '6px' }}
          >
            {_label}
            {_error && errors}
          </label>
        ) : null}
        {element}
      </Box>
    </Stack>
  );
};

interface MyCheckboxProps {
  label?: React.ReactNode;
  isChecked?: boolean;
  name?: string;
  id?: string;
  onChange?: (e: { target: { name: string | undefined; value: boolean } }) => void;
  [key: string]: unknown;
}

const MyCheckbox = ({ label, isChecked, name, id, onChange, ...props }: MyCheckboxProps) => (
  <Checkbox.Root
    checked={isChecked}
    name={name}
    id={id}
    onCheckedChange={(e) => onChange?.({ target: { name, value: !!e.checked } })}
    {...props}
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control />
    <Checkbox.Label>{label}</Checkbox.Label>
  </Checkbox.Root>
);

const checkBoxProcessor = ({ value, name, ...props }: Record<string, unknown>) => {
  return { ...props, isChecked: value, name: name };
};

const radioProcessor = ({ value, name, onChange, ...props }: Record<string, unknown>) => {
  const _onChange = (value: unknown) => {
    const e = { target: { name: name as string, value: value as string } };
    return (onChange as (e: unknown) => unknown)(e);
  };

  return { ...props, isChecked: value, name: name, onChange: _onChange };
};

const dropdownProcessor = ({ name, placeholder = null, ...props }: Record<string, unknown>) => {
  const extras = {
    placeholder: placeholder || `Select a ${ToTitleCase((name as string) || '')}`,
    name: name,
  };

  return { ...props, ...extras };
};

interface AutoSelectProps {
  options?: OptionItem[];
  [key: string]: unknown;
}

const AutoSelect = ({ options = [], ...props }: AutoSelectProps) => (
  <NativeSelect.Root {...props}>
    <NativeSelect.Field>
      {options.map((o) => (
        <option value={o.value as string | number | undefined} key={o.key as React.Key}>
          {o.text}
        </option>
      ))}
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
);

interface AutoRadioProps {
  options?: OptionItem[];
  isChecked?: unknown;
  [key: string]: unknown;
}

const AutoRadio = ({ options = [], isChecked, ...props }: AutoRadioProps) => (
  <RadioGroup.Root value={`${isChecked}`} {...props}>
    <Stack direction="row">
      {options.map((o) => (
        <RadioGroup.Item value={`${o.value}`} key={o.key as React.Key}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{o.text}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </Stack>
  </RadioGroup.Root>
);

interface DateFieldProps {
  value?: Date | string | null;
  [key: string]: unknown;
}

const DateField = ({ value, ...props }: DateFieldProps) => {
  let dateValue = '';
  if (value instanceof Date) {
    const year = `${value.getFullYear()}`;
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const date = `${value.getDate()}`.padStart(2, '0');
    dateValue = [year, month, date].join('-');
  } else if (value) {
    dateValue = value as string;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Input type={'date'} value={dateValue} {...(props as any)} />;
};

const BoolField = (props: Record<string, unknown>) => (
  <AutoRadio
    options={[
      { text: 'Yes', key: 'yes', value: true },
      { text: 'No', key: 'no', value: false },
    ]}
    {...props}
  />
);

interface FancyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>(
  ({ leftAddon, rightAddon, leftElement, rightElement, left, right, ...rest }, ref) => (
    <InputGroup
      startAddon={leftAddon ?? (left as string | undefined)}
      endAddon={rightAddon ?? (right as string | undefined)}
      startElement={leftElement}
      endElement={rightElement}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Input {...(rest as any)} ref={ref} />
    </InputGroup>
  )
);
FancyInput.displayName = 'FancyInput';

const FormField = (props: Record<string, unknown>) => <Field as={Input} {...props} />;
const FormButton = (props: Record<string, unknown>) => <FormikField as={Button} {...props} />;
const FormCheckbox = (props: Record<string, unknown>) => (
  <Field as={MyCheckbox} processor={checkBoxProcessor} showLabel={false} {...props} />
);
const FormDropdown = (props: Record<string, unknown>) => (
  <Field as={AutoSelect} processor={dropdownProcessor} {...props} />
);
const FormInput = (props: Record<string, unknown>) => <Field as={FancyInput} {...props} />;
const FormDateField = (props: Record<string, unknown>) => <Field as={DateField} {...props} />;
const FormRadio = (props: Record<string, unknown>) => <Field as={AutoRadio} processor={radioProcessor} {...props} />;
const FormSelect = (props: Record<string, unknown>) => <Field as={AutoSelect} {...props} />;
const FormTextArea = (props: Record<string, unknown>) => <Field as={Textarea} {...props} />;
const FormBoolField = (props: Record<string, unknown>) => <Field as={BoolField} {...props} />;

interface InnerFormProps extends React.HTMLAttributes<HTMLFormElement> {
  action?: string;
  children?: React.ReactNode;
}

export const InnerForm = React.forwardRef<HTMLFormElement, InnerFormProps>((props, ref) => {
  const { action, children, ...rest } = props;
  const { handleReset, handleSubmit } = useFormikContext();

  return (
    <form onSubmit={handleSubmit} ref={ref} onReset={handleReset} action={action || '#'} {...rest}>
      <Stack>{children}</Stack>
    </form>
  );
});
InnerForm.displayName = 'InnerForm';

interface FormProps<T extends FormikValues = FormikValues> extends Omit<FormikConfig<T>, 'children'> {
  children?:
    React.ReactNode | ((props: Omit<FormProps<T>, 'children'>, formik: Record<string, unknown>) => React.ReactNode);
  loading?: boolean | string;
  validateOnChange?: boolean;
  error?: string;
}

type FormComponent = {
  <T extends FormikValues = FormikValues>(props: FormProps<T>): React.ReactElement;
  Field: typeof FormField;
  Button: typeof FormButton;
  Checkbox: typeof FormCheckbox;
  Dropdown: typeof FormDropdown;
  Input: typeof FormInput;
  Radio: typeof FormRadio;
  Select: typeof FormSelect;
  TextArea: typeof FormTextArea;
  DateField: typeof FormDateField;
  BoolField: typeof FormBoolField;
  displayName?: string;
};

export const Form: FormComponent = (<T extends FormikValues = FormikValues>({
  children,
  loading = false,
  initialValues = {} as T,
  validationSchema = null,
  validateOnChange = false,
  ...props
}: FormProps<T>) => {
  let _initialValues: Record<string, unknown> = initialValues as Record<string, unknown>;

  if (validationSchema !== null) {
    const schema = validationSchema as {
      describe: () => { fields: Record<string, unknown> };
      cast: (v: unknown, o: unknown) => Record<string, unknown>;
    };
    const { fields } = schema.describe();

    // assert: false — yup 1.x cast throws on required fields missing from
    // initial values; the reduce below fills the gaps with '' instead.
    _initialValues = schema.cast(_initialValues, { stripUnknown: true, assert: false });
    _initialValues = Object.keys(fields).reduce((iv: Record<string, unknown>, f) => {
      if (typeof _initialValues[f] == 'undefined' || _initialValues[f] == null) {
        iv[f] = '';
      } else {
        iv[f] = _initialValues[f];
      }

      return iv;
    }, {});
    Object.keys(fields).map((key) => (!(key in _initialValues) ? (_initialValues[key] = undefined) : null));
  }

  const formikProps = { ...props, validateOnChange };
  return (
    <Formik validationSchema={validationSchema} initialValues={_initialValues as T} {...formikProps}>
      {({ isSubmitting, isValidating, errors, touched, dirty, ...rest }) => {
        const reduceErrors = (errs: Record<string, unknown>): Record<string, unknown> => {
          const flat: Record<string, unknown> = {};
          Object.keys(errs).forEach((e) => {
            const error = errs[e];
            if (typeof error == 'object' && error !== null) {
              Object.assign(flat, reduceErrors(error as Record<string, unknown>));
            } else {
              flat[e] = error;
            }
          });
          return Object.keys(touched).reduce((acc: Record<string, unknown>, e) => {
            if (e in flat) {
              acc[e] = errs[e];
            }
            return acc;
          }, {});
        };

        const touchedErrors = reduceErrors(errors as Record<string, unknown>);

        const error = dirty ? Object.values(touchedErrors).join(', ') : '';
        const isLoading = isSubmitting || isValidating || !!loading;
        const loadingContent = typeof loading === 'string' ? loading : 'Saving';

        const formContent = (
          <>
            <ErrorMessage title={'There was an issue saving details'} message={`${error}`} />
            <InnerForm>
              {typeof children === 'function'
                ? children(props as Omit<FormProps<T>, 'children'>, rest as Record<string, unknown>)
                : children}
            </InnerForm>
          </>
        );
        return (
          <Loader loading={isLoading} content={loadingContent}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {formContent as any}
          </Loader>
        );
      }}
    </Formik>
  );
}) as unknown as FormComponent;

Form.Field = FormField;
Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Input = FormInput;
Form.Radio = FormRadio;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
Form.DateField = FormDateField;
Form.BoolField = FormBoolField;

Form.displayName = 'Form';
