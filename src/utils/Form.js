import { ToTitleCase } from '../utils/string';
import ErrorMessage from '../widgets/ErrorMessage';
import Loader from '../widgets/Loader';
import './Form.css';
import {
  Input,
  Select,
  Button,
  Checkbox,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Box,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  InputLeftAddon,
  InputLeftElement,
} from '@chakra-ui/react';
import { useFormikContext, Field as FormikField, useField, Formik } from 'formik';
import * as React from 'react';
import 'react-day-picker/lib/style.css';

const Field = ({ as, children, processor, name, label = null, showLabel = true, ...props }) => {
  const [field, meta] = useField(Object.assign(props, { name }));
  const { error = null, touched } = meta;
  const _error = touched && error;
  const _label = label || ToTitleCase(name || 'broken');
  const extras = {
    name: name,
    label: _label,
    id: name,
  };

  const _processor = processor || ((p) => p);
  const newProps = { ...field, ...props, ...extras };

  const element = React.createElement(as, _processor(newProps), children);

  const errors = error !== null ? <Text as="span">{` - ${error}`}</Text> : '';

  return (
    <Stack>
      <Box color={_error ? 'form.error' : ''}>
        {showLabel ? (
          <Text as="label" htmlFor={name}>
            {_label}
            {_error && errors}
          </Text>
        ) : null}
        {element}
      </Box>
    </Stack>
  );
};

const MyCheckbox = ({ label, ...props }) => <Checkbox {...props}>{label}</Checkbox>;

const checkBoxProcessor = ({ value, name, ...props }) => {
  return { ...props, isChecked: value, name: name };
};

const radioProcessor = ({ value, name, onChange, ...props }) => {
  const _onChange = (value) => {
    const e = { target: {} };
    e.target.name = name;
    e.target.value = value;

    return onChange(e);
  };

  return { ...props, isChecked: value, name: name, onChange: _onChange };
};

const dropdownProcessor = ({ name, placeholder = null, ...props }) => {
  const extras = {
    placeholder: placeholder || `Select a ${ToTitleCase(name)}`,
    name: name,
  };

  return { ...props, ...extras };
};

const AutoSelect = ({ options = [], ...props }) => (
  <Select {...props}>
    {options.map((o) => (
      <option value={o.value} key={o.key}>
        {o.text}
      </option>
    ))}
  </Select>
);

const AutoRadio = ({ options = [], isChecked, ...props }) => (
  <RadioGroup value={isChecked} {...props}>
    <Stack direction="row">
      {options.map((o) => (
        <Radio value={o.value} key={o.key}>
          {o.text}
        </Radio>
      ))}
    </Stack>
  </RadioGroup>
);

const DateField = ({ value = '', ...props }) => {
  if (typeof value == 'object' && value !== null) {
    const year = `${value.getFullYear()}`;
    const month = `${value.getMonth() + 1}`.padStart('0');
    const date = `${value.getDate()}`.padStart('0');
    value = [year, month, date].join('-');
  }
  return <Input type={'date'} format={'DD-MM-YYYY'} value={value} {...props} />;
};

const BoolField = (props) => (
  <AutoRadio
    options={[
      { text: 'Yes', key: 'yes', value: true },
      { text: 'No', key: 'no', value: false },
    ]}
    {...props}
  />
);

const FancyInput = React.forwardRef(
  ({ leftAddon, rightAddon, leftElement, rightElement, left, right, ...rest }, ref) => (
    <InputGroup>
      {left}
      {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
      {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
      <Input {...rest} ref={ref} />
      {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
      {right}
    </InputGroup>
  )
);
FancyInput.displayName = 'FancyInput';

const FormField = (props) => <Field as={Input} {...props} />;
const FormButton = (props) => <FormikField as={Button} {...props} />;
const FormCheckbox = (props) => <Field as={MyCheckbox} processor={checkBoxProcessor} showLabel={false} {...props} />;
const FormDropdown = (props) => <Field as={AutoSelect} processor={dropdownProcessor} {...props} />;
const FormInput = (props) => <Field as={FancyInput} {...props} />;
const FormDateField = (props) => <Field as={DateField} {...props} />;
const FormRadio = (props) => <Field as={AutoRadio} processor={radioProcessor} {...props} />;
const FormSelect = (props) => <Field as={AutoSelect} {...props} />;
const FormTextArea = (props) => <Field as={Textarea} {...props} />;
const FormBoolField = (props) => <Field as={BoolField} {...props} />;

export const InnerForm = React.forwardRef((props, ref) => {
  const { action, children, ...rest } = props;
  const { handleReset, handleSubmit } = useFormikContext();

  return (
    <form onSubmit={handleSubmit} ref={ref} onReset={handleReset} action={action || '#'} {...rest}>
      <Stack>{children}</Stack>
    </form>
  );
});
InnerForm.displayName = 'InnerForm';

export const Form = ({
  children,
  loading = false,
  initialValues = {},
  validationSchema = null,
  validateOnChange = false,
  ...props
}) => {
  if (validationSchema !== null) {
    const description = validationSchema.describe();
    const { fields } = description;

    initialValues = validationSchema.cast(initialValues, { stripUnknown: true });
    initialValues = Object.keys(fields).reduce((iv, f) => {
      if (typeof initialValues[f] == 'undefined' || initialValues[f] == null) {
        iv[f] = '';
      } else {
        iv[f] = initialValues[f];
      }

      return iv;
    }, {});
    Object.keys(fields).map((key) => (!(key in initialValues) ? (initialValues[key] = undefined) : null));
  }

  props.validateOnChange = validateOnChange;
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} {...props}>
      {({ isSubmitting, isValidating, errors, touched, dirty, ...rest }) => {
        const reduceErrors = (errors) => {
          return Object.keys(errors)
            .reduce((errs, e) => {
              const error = errors[e];
              if (typeof error == 'object') {
                return Object.assign(errs, reduceErrors(error));
              }

              errs[e] = error;
              return errs;
            }, [])
            .reduce((errs, e) => {
              if (Object.keys(touched).includes(e)) {
                errs[e] = errors[e];
              }
              return errs;
            }, {});
        };

        const touchedErrors = reduceErrors(errors);

        const error = dirty ? Object.values(touchedErrors).join(', ') : '';

        return (
          <Loader loading={isSubmitting || isValidating || loading} content={loading || 'Saving'}>
            <ErrorMessage title={'There was an issue saving details'} message={`${error}`} />
            <InnerForm>{typeof children === 'function' ? children(props, rest) : children}</InnerForm>
          </Loader>
        );
      }}
    </Formik>
  );
};

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
