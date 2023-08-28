/* eslint-disable */
import { McButton } from '@maersk-global/mds-react-wrapper';
import { McInput } from '@maersk-global/mds-react-wrapper/components-core/mc-input';
import { McLoadingIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-loading-indicator';
import { useMemo, useState } from 'react';
import './App.css';
import { useQueryParams } from './hooks/useQueryParams';
import { useStructureEndpoint } from './hooks/useStructureEndpoint';

/**
 * TODO: create tooltip context provider (based on maersk component)
 */
function App() {
  const [urlEndpoint, setUrlEndpoint] = useState<string>('');

  const { updatedQueryParams, addNewQueryParam, updateQueryParam, deleteQueryParam } =
    useQueryParams();

  const { isLoading, data, sendRequest } = useStructureEndpoint({
    endpoint: urlEndpoint,
    queryParams: [...updatedQueryParams.values()],
  });

  const updatedQueryParamsStringFormat = useMemo(() => {
    return [...updatedQueryParams.values()]
      .filter(({ name }) => name)
      .reduce(
        (acc, { name, value }, index) =>
          (acc += `${index === 0 ? '?' : '&'}${name}=${value}`),
        ''
      );
  }, [updatedQueryParams]);

  const updatedEndpointWithParams = urlEndpoint.concat(updatedQueryParamsStringFormat);

  return (
    <>
      <h2>{updatedEndpointWithParams}</h2>

      <McInput
        label='API endpoint'
        fit='large'
        clearbutton
        hiddenlabel
        placeholder='Insert your endpoint'
        width='auto'
        autocomplete='off'
        value={urlEndpoint}
        input={(e) =>
          setUrlEndpoint(
            (e as unknown as React.ChangeEvent<HTMLInputElement>).target.value
          )
        }
      />

      <div style={{ padding: '1rem 0 0 3rem', textAlign: 'start' }}>
        <h3>Params</h3>

        {[...updatedQueryParams].map(([key, { name: paramName, value: paramValue }]) => {
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
        })}

        <div style={{ marginTop: '1.5rem' }}>
          <McButton
            label='Add new param'
            appearance='secondary'
            trailingicon='plus'
            click={addNewQueryParam}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '3rem' }}>
        {/* //!NOTE: button to add new param should be disabled if there is form error */}
        <McButton label='Call API' click={sendRequest} />
      </div>

      {isLoading ? (
        <McLoadingIndicator label='loading' fit='large' />
      ) : data ? (
        JSON.stringify(data)
      ) : null}
    </>
  );
}

export default App;
