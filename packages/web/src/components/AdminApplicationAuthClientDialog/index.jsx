import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import useFormatMessage from 'hooks/useFormatMessage';
import InputCreator from 'components/InputCreator';
import Switch from 'components/Switch';
import TextField from 'components/TextField';
import { Form } from './style';
export default function AdminApplicationAuthClientDialog(props) {
  const {
    error,
    onClose,
    title,
    loading,
    submitHandler,
    authFields,
    submitting,
    defaultValues,
    disabled = false,
  } = props;
  const formatMessage = useFormatMessage();
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {error && (
        <Alert
          severity="error"
          sx={{ mt: 1, fontWeight: 500, wordBreak: 'break-all' }}
        >
          {error.message}
        </Alert>
      )}
      <DialogContent>
        {loading ? (
          <CircularProgress
            data-test="search-for-app-loader"
            sx={{ display: 'block', margin: '20px auto' }}
          />
        ) : (
          <DialogContentText tabIndex={-1} component="div">
            <Form
              onSubmit={submitHandler}
              defaultValues={defaultValues}
              render={({ formState: { isDirty } }) => (
                <>
                  <Switch
                    name="active"
                    label={formatMessage('authClient.inputActive')}
                  />
                  <TextField
                    required={true}
                    name="name"
                    label={formatMessage('authClient.inputName')}
                    fullWidth
                  />
                  {authFields?.map((field) => (
                    <InputCreator key={field.key} schema={field} />
                  ))}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ boxShadow: 2 }}
                    loading={submitting}
                    disabled={disabled || !isDirty}
                  >
                    {formatMessage('authClient.buttonSubmit')}
                  </LoadingButton>
                </>
              )}
            ></Form>
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
}
