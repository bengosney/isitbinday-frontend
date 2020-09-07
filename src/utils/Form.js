import * as React from 'react';
import { useFormikContext, Field as FormikField, useField } from 'formik';
import { Form as UIForm } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { CammelToTitle } from '../utils/string';

const Field = ({ as, children, processor, label = null, ...props }) => {
  const [field, meta] = useField(props);
  const { name } = props;

  const extras = {
    error: meta.touched && meta.error,
    name: name,
    label: label || CammelToTitle(name),
  };

  const _processor = processor || ((p) => p);
  const newProps = { ...field, ...props, ...extras };

  return React.createElement(as, _processor(newProps), children);
};

const checkBoxProcessor = ({ value, name, onChange, onBlur, ...props }) => {
  const _onChange = (e, { checked }) => {
    e.target.name = name;
    e.target.value = checked;

    return onChange(e);
  };

  const _onBlur = (e) => {};

  return { ...props, checked: value, name: name, onChange: _onChange, onBlur: _onBlur };
};

const dropdownProcessor = ({ name, onChange, onBlur, placeholder = null, ...props }) => {
  const _onChange = (e, { value }) => {
    e.target.name = name;
    e.value = value;
    e.target.value = value;

    return onChange(e);
  };

  const _onBlur = (e) => {};

  const extras = {
    placeholder: placeholder || `Select a ${name}`,
  };

  return { ...props, ...extras, name: name, onChange: _onChange, onBlur: _onBlur };
};

const FormField = (props) => <Field as={UIForm.Field} {...props} />;
const FormButton = (props) => <FormikField as={UIForm.Button} {...props} />;
const FormCheckbox = (props) => <Field as={UIForm.Checkbox} processor={checkBoxProcessor} {...props} />;
const FormDropdown = (props) => <Field as={UIForm.Dropdown} processor={dropdownProcessor} {...props} />;
const FormGroup = (props) => <Field as={UIForm.Group} {...props} />;
const FormInput = (props) => <Field as={UIForm.Input} {...props} />;
const FormRadio = (props) => <Field as={UIForm.Radio} processor={checkBoxProcessor} {...props} />;
const FormSelect = (props) => <Field as={UIForm.Select} {...props} />;
const FormTextArea = (props) => <Field as={UIForm.TextArea} {...props} />;

const QueryDropdown = ({ query, textProp, disabled = false, placeholder = null, ...props }) => {
  const { loading, error, data } = useQuery(query);

  if (error) return <p>{`${error}`}</p>;

  const _data = loading ? [] : data[Object.keys(data)[0]];

  const options = _data.map((e) => ({ text: e[textProp], key: e._id, value: e._id }));

  const extraProps = {
    search: options.length > 25,
    scrolling: options.length > 15,
    disabled: disabled || loading,
    placeholder: loading ? 'Loading...' : placeholder,
  };

  return <FormDropdown options={options} {...extraProps} {...props} />;
};

export const Form = React.forwardRef((props, ref) => {
  const { action, ...rest } = props;
  const _action = action || '#';
  const { handleReset, handleSubmit } = useFormikContext();

  return <UIForm onSubmit={handleSubmit} ref={ref} onReset={handleReset} action={_action} {...rest} />;
});

Form.Field = FormField;
Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Group = FormGroup;
Form.Input = FormInput;
Form.Radio = FormRadio;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
Form.QueryDropdown = QueryDropdown;

Form.displayName = 'Form';
