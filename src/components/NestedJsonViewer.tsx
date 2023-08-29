import { useState } from 'react';
import { isObject } from '../utils/object';

const primitiveTypes = ['string', 'number', 'boolean'];

/**
 * @description
 * Following single responsibility principle, the nested object
 * component main task is to toggle the accordion and show/hide
 * the nested content.
 */
function NestedObject({
  parentKey,
  nestedObj,
  iteration,
}: {
  parentKey: string;
  nestedObj: Record<string, unknown>;
  iteration: number;
}) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <>
      {/* Button + label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <button onClick={() => setAccordionOpen((prevState) => !prevState)}>
          {accordionOpen ? 'v' : '>'}
        </button>
        <div>{`${parentKey} {${Object.keys(nestedObj).length}}`}</div>
      </div>

      {/* Nested recursive properties */}
      <div
        style={{
          height: accordionOpen ? 'auto' : 0,
          overflow: 'hidden',
        }}
      >
        <NestedJsonViewer obj={nestedObj} iteration={iteration + 1} />
      </div>
    </>
  );
}

export default function NestedJsonViewer({
  obj,
  iteration = 1,
}: {
  obj: Record<string, unknown>;
  iteration?: number;
}) {
  return Object.entries(obj).map((currentObj, index) => {
    const [objectKey, value] = currentObj;

    return (
      <div
        key={`json-${value}-${index}`}
        style={{
          textAlign: 'start',
          marginBottom: '1rem',
          marginLeft: `calc(1rem * ${iteration})`,
        }}
      >
        {primitiveTypes.includes(typeof value) ? (
          <div>{`${objectKey} : ${value}`}</div>
        ) : !value ? (
          <div>{`${objectKey} : data not available`}</div>
        ) : isObject(value) ? (
          <NestedObject
            iteration={iteration}
            parentKey={objectKey}
            nestedObj={value as Record<string, unknown>}
          />
        ) : null}
      </div>
    );
  });
}
