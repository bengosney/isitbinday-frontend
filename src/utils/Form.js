import * as React from 'react';
import { useFormikContext, Field as FormikField, useField, Formik } from 'formik';
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
} from '@chakra-ui/core';
import { ToTitleCase } from '../utils/string';
import ErrorMessage from '../widgets/ErrorMessage';
import Loader from '../widgets/Loader';
import DayPickerInput from 'react-day-picker/DayPickerInput';


import 'react-day-picker/lib/style.css';

const Field = ({ as, children, processor, label = null, showLabel = true, ...props }) => {
  const [field, meta] = useField(props);
  const { name } = props;
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
            {errors}
          </Text>
        ) : null}
        {element}
      </Box>
    </Stack>
  );
};

const MyCheckbox = ({ label, error, ...props }) => <Checkbox {...props}>{label}</Checkbox>;

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

const DateField = ({ value: initalValue = '', ...props }) => {
  return (
    <>
      <DayPickerInput
        format={'MM/dd/yyyy'}
        placeholder={''}
        formatDate={(date, format, local) => {
          return new Intl.DateTimeFormat('en-GB').format(new Date(date));
        }}
        component={React.forwardRef((props, ref) => <Input ref={ref} {...props} />)}
        {...props}
      />
    </>
  );
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

const FormField = (props) => <Field as={Input} {...props} />;
const FormButton = (props) => <FormikField as={Button} {...props} />;
const FormCheckbox = (props) => <Field as={MyCheckbox} processor={checkBoxProcessor} showLabel={false} {...props} />;
const FormDropdown = (props) => <Field as={AutoSelect} processor={dropdownProcessor} {...props} />;
const FormInput = (props) => <Field as={Input} {...props} />;
const FormDateField = (props) => <Field as={DateField} {...props} />;
const FormRadio = (props) => <Field as={AutoRadio} processor={radioProcessor} {...props} />;
const FormSelect = (props) => <Field as={AutoSelect} {...props} />;
const FormTextArea = (props) => <Field as={Textarea} {...props} />;
const FormBoolField = (props) => <Field as={BoolField} {...props} />;

export const InnerForm = React.forwardRef((props, ref) => {
  const { action, children, ...rest } = props;
  const _action = action || '#';
  const { handleReset, handleSubmit } = useFormikContext();

  return (
    <form onSubmit={handleSubmit} ref={ref} onReset={handleReset} action={_action} {...rest}>
      <Stack>{children}</Stack>
    </form>
  );
});

export const Form = ({ children, error = '', loading = false, ...props }) => (
  <Formik {...props}>
    {(props) => {
      const { isSubmitting, isValidating } = props;

      return (
        <React.Fragment>
          <ErrorMessage title={'There was an issue saving details'} message={`${error}`} />
          <Loader loading={isSubmitting || isValidating || loading} content="Saving" />
          <InnerForm>{children}</InnerForm>
        </React.Fragment>
      );
    }}
  </Formik>
);

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
