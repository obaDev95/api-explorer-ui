/* eslint-disable */
import { McButton } from '@maersk-global/mds-react-wrapper';
import { McInput } from '@maersk-global/mds-react-wrapper/components-core/mc-input';
import { McLoadingIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-loading-indicator';
import { McNotification } from '@maersk-global/mds-react-wrapper/components-core/mc-notification';
import { useState } from 'react';
import './App.css';
import NestedJsonViewer from './components/NestedJsonViewer';
import { useQueryParams } from './hooks/useQueryParams';
import { useResponseTime } from './hooks/useResponseTime';
import { useStructureEndpoint } from './hooks/useStructureEndpoint';

/**
 * !IMPORTANT [FEATURE]: implement toggle between plain text and tree view
 * !IMPORTANT [FEATURE]: implement button url to past endpoint (GET method)
 * !IMPORTANT [FEATURE]: implement download feature
 * TODO: Code Generation (openAI) -> offer an option to generate code snippets based on the current API configuration. This can help users integrate API calls into their code.
 * TODO: create tooltip context provider (based on maersk component)
 */
function App() {
  const [urlEndpoint, setUrlEndpoint] = useState<string>('');

  const {
    updatedQueryParams,
    updatedQueryParamsStringFormat,
    addNewQueryParam,
    updateQueryParam,
    deleteQueryParam,
  } = useQueryParams();

  const { isLoading, data, hasError, sendRequest } = useStructureEndpoint({
    endpoint: urlEndpoint,
    queryParams: [...updatedQueryParams.values()],
  });

  const timeTakenForApiToComplete = useResponseTime();

  return (
    <>
      <div style={{ display: 'flex', gap: '3rem', textAlign: 'start' }}>
        <div
          style={{
            flex: 1,
            maxWidth: '600px',
            position: 'sticky',
            borderRight: '1px solid #cfcfcf',
            paddingRight: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <McInput
              label='API endpoint'
              style={{ flex: 1 }}
              clearbutton
              hiddenlabel
              placeholder='Insert your endpoint'
              width='100'
              autocomplete='off'
              value={urlEndpoint}
              input={(e) =>
                setUrlEndpoint(
                  (e as unknown as React.ChangeEvent<HTMLInputElement>).target.value
                )
              }
            />

            <McButton label='Call API' loading={isLoading} click={sendRequest} />
          </div>

          <div style={{ margin: '2rem 0 0 1.5rem', textAlign: 'start' }}>
            <h3>Params</h3>

            {[...updatedQueryParams].map(
              ([key, { name: paramName, value: paramValue }]) => {
                return (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <McInput
                      autocomplete='off'
                      hiddenlabel
                      label=''
                      placeholder='Insert your param key'
                      width='auto'
                      value={paramName}
                      input={(e) => {
                        const updatedQueryParamName = (
                          e as unknown as React.ChangeEvent<HTMLInputElement>
                        ).target.value;

                        updateQueryParam(key, {
                          name: updatedQueryParamName,
                          value: paramValue,
                        });
                      }}
                      clearbutton
                    />

                    <McInput
                      autocomplete='off'
                      hiddenlabel
                      label=''
                      placeholder='Insert your param value'
                      width='auto'
                      value={paramValue}
                      input={(e) => {
                        const updatedQueryParamValue = (
                          e as unknown as React.ChangeEvent<HTMLInputElement>
                        ).target.value;

                        updateQueryParam(key, {
                          name: paramName,
                          value: updatedQueryParamValue,
                        });
                      }}
                      clearbutton
                    />

                    <McButton
                      label='Remove'
                      hiddenlabel
                      disabled={updatedQueryParams.size <= 1}
                      appearance='secondary'
                      trailingicon='times-circle'
                      click={() => deleteQueryParam(key)}
                    />
                  </div>
                );
              }
            )}

            <div style={{ marginTop: '1.5rem' }}>
              <McButton
                label='Add new param'
                appearance='secondary'
                trailingicon='plus'
                click={addNewQueryParam}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: '500px',
            overflow: 'auto',
            flex: 1,
          }}
        >
          {isLoading ? (
            <McLoadingIndicator
              label='Loading data'
              variant='bar'
              fit='small'
              style={{ width: '100%' }}
            />
          ) : data ? (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <McNotification
                  heading={urlEndpoint.concat(updatedQueryParamsStringFormat)}
                  body={
                    timeTakenForApiToComplete <= 0
                      ? 'Wow, that was super fast!'
                      : `It took ${timeTakenForApiToComplete} seconds to complete the request`
                  }
                  appearance='success'
                />
              </div>

              <NestedJsonViewer obj={data as any} />
            </>
          ) : hasError ? (
            <div>Error to handle</div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
