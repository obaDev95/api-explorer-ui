/* eslint-disable */
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';
import { McSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-select';
import { useState } from 'react';
import NestedJsonViewer from './NestedJsonViewer';

type JsonDataViewResultProps = {
  jsonData: Record<string, unknown>;
};

const formatsAvailable = ['json', 'tree'] as const;
type FormatAvailable = (typeof formatsAvailable)[number];

interface SelectChangeEvent<T> extends CustomEvent {
  target: HTMLInputElement & {
    value: T;
  };
}

export default function JsonDataViewResult({ jsonData }: JsonDataViewResultProps) {
  const [formatAvailable, setFormatAvailable] = useState<FormatAvailable>('json');

  function handleSelectValueChange(e: unknown): void {
    const updatedValue = (e as SelectChangeEvent<FormatAvailable>).target.value;
    setFormatAvailable(updatedValue);
  }

  return (
    <>
      <McSelect label='Formats' placeholder='' input={handleSelectValueChange}>
        {formatsAvailable.map((format, index) => {
          return (
            <McOption key={`${format}-${index}`} value={format}>
              {format}
            </McOption>
          );
        })}
      </McSelect>

      <div style={{ margin: '2rem 0' }}>
        {formatAvailable === 'json' ? (
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        ) : (
          <NestedJsonViewer obj={jsonData as any} />
        )}
      </div>
    </>
  );
}
