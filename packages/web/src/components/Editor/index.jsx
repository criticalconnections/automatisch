import * as React from 'react';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { GET_FLOW } from 'graphql/queries/get-flow';
import { CREATE_STEP } from 'graphql/mutations/create-step';
import { UPDATE_STEP } from 'graphql/mutations/update-step';
import FlowStep from 'components/FlowStep';
function updateHandlerFactory(flowId, previousStepId) {
  return function createStepUpdateHandler(cache, mutationResult) {
    const { data } = mutationResult;
    const { createStep: createdStep } = data;
    const { getFlow: flow } = cache.readQuery({
      query: GET_FLOW,
      variables: { id: flowId },
    });
    const steps = flow.steps.reduce((steps, currentStep) => {
      if (currentStep.id === previousStepId) {
        return [...steps, currentStep, createdStep];
      }
      return [...steps, currentStep];
    }, []);
    cache.writeQuery({
      query: GET_FLOW,
      variables: { id: flowId },
      data: { getFlow: { ...flow, steps } },
    });
  };
}
export default function Editor(props) {
  const [updateStep] = useMutation(UPDATE_STEP);
  const [createStep, { loading: creationInProgress }] = useMutation(
    CREATE_STEP,
    {
      refetchQueries: ['GetFlow'],
    },
  );
  const { flow } = props;
  const [triggerStep] = flow.steps;
  const [currentStepId, setCurrentStepId] = React.useState(triggerStep.id);
  const onStepChange = React.useCallback(
    (step) => {
      const mutationInput = {
        id: step.id,
        key: step.key,
        parameters: step.parameters,
        connection: {
          id: step.connection?.id,
        },
        flow: {
          id: flow.id,
        },
      };
      if (step.appKey) {
        mutationInput.appKey = step.appKey;
      }
      updateStep({ variables: { input: mutationInput } });
    },
    [updateStep, flow.id],
  );
  const addStep = React.useCallback(
    async (previousStepId) => {
      const mutationInput = {
        previousStep: {
          id: previousStepId,
        },
        flow: {
          id: flow.id,
        },
      };
      const createdStep = await createStep({
        variables: { input: mutationInput },
        update: updateHandlerFactory(flow.id, previousStepId),
      });
      const createdStepId = createdStep.data.createStep.id;
      setCurrentStepId(createdStepId);
    },
    [createStep, flow.id],
  );
  const openNextStep = React.useCallback((nextStep) => {
    return () => {
      setCurrentStepId(nextStep?.id);
    };
  }, []);
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      alignSelf="center"
      py={3}
      gap={1}
    >
      {flow?.steps?.map((step, index, steps) => (
        <React.Fragment key={`${step.id}-${index}`}>
          <FlowStep
            key={step.id}
            step={step}
            index={index + 1}
            collapsed={currentStepId !== step.id}
            onOpen={() => setCurrentStepId(step.id)}
            onClose={() => setCurrentStepId(null)}
            onChange={onStepChange}
            onContinue={openNextStep(steps[index + 1])}
          />

          <IconButton
            onClick={() => addStep(step.id)}
            color="primary"
            disabled={creationInProgress || flow.active}
          >
            <AddIcon />
          </IconButton>
        </React.Fragment>
      ))}
    </Box>
  );
}
