import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { AppPropType } from 'propTypes/propTypes';
import { UPDATE_APP_AUTH_CLIENT } from 'graphql/mutations/update-app-auth-client';
import useAppAuthClient from 'hooks/useAppAuthClient.ee';
import useFormatMessage from 'hooks/useFormatMessage';
import AdminApplicationAuthClientDialog from 'components/AdminApplicationAuthClientDialog';

function AdminApplicationUpdateAuthClient(props) {
  const { application, onClose } = props;
  const { auth } = application;
  const authFields = auth?.fields?.map((field) => ({
    ...field,
    required: false,
  }));
  const formatMessage = useFormatMessage();
  const { clientId } = useParams();
  const { appAuthClient, loading: loadingAuthClient } =
    useAppAuthClient(clientId);
  const [updateAppAuthClient, { loading: loadingUpdateAppAuthClient, error }] =
    useMutation(UPDATE_APP_AUTH_CLIENT, {
      refetchQueries: ['GetAppAuthClients'],
      context: { autoSnackbar: false },
    });
  const submitHandler = async (values) => {
    if (!appAuthClient) {
      return;
    }
    const { name, active, ...formattedAuthDefaults } = values;
    await updateAppAuthClient({
      variables: {
        input: {
          id: appAuthClient.id,
          name,
          active,
          formattedAuthDefaults,
        },
      },
    });
    onClose();
  };
  const getAuthFieldsDefaultValues = useCallback(() => {
    if (!authFields) {
      return {};
    }
    const defaultValues = {};
    authFields.forEach((field) => {
      if (field.value || field.type !== 'string') {
        defaultValues[field.key] = field.value;
      } else if (field.type === 'string') {
        defaultValues[field.key] = '';
      }
    });
    return defaultValues;
  }, [auth?.fields]);
  const defaultValues = useMemo(
    () => ({
      name: appAuthClient?.name || '',
      active: appAuthClient?.active || false,
      ...getAuthFieldsDefaultValues(),
    }),
    [appAuthClient, getAuthFieldsDefaultValues],
  );
  return (
    <AdminApplicationAuthClientDialog
      onClose={onClose}
      error={error}
      title={formatMessage('updateAuthClient.title')}
      loading={loadingAuthClient}
      submitHandler={submitHandler}
      authFields={authFields}
      submitting={loadingUpdateAppAuthClient}
      defaultValues={defaultValues}
      disabled={!appAuthClient}
    />
  );
}

AdminApplicationUpdateAuthClient.propTypes = {
  application: AppPropType.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminApplicationUpdateAuthClient;
