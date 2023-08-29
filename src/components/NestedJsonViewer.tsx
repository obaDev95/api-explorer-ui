import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import React, { useState } from 'react';
import { isArray, isObject } from '../utils/object';

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
        <McButton
          label='Button'
          hiddenlabel
          fit='small'
          appearance='secondary'
          variant='outlined'
          icon={accordionOpen ? 'chevron-down' : 'chevron-right'}
          click={() => setAccordionOpen((prevState) => !prevState)}
        />

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

function NestedArray({
  parentKey,
  arr,
  iteration,
}: {
  parentKey: string;
  arr: Record<string, unknown>[];
  iteration: number;
}) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <React.Fragment key={`arr-${arr}`}>
      {/* Button + label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <McButton
          label='Button'
          hiddenlabel
          fit='small'
          appearance='secondary'
          variant='outlined'
          icon={accordionOpen ? 'chevron-down' : 'chevron-right'}
          click={() => setAccordionOpen((prevState) => !prevState)}
        />

        <div>{`${parentKey} [${arr.length}]`}</div>
      </div>

      <div
        style={{
          height: accordionOpen ? 'auto' : 0,
          overflow: 'hidden',
          marginLeft: `calc(1rem * ${iteration})`,
        }}
      >
        {arr.length > 0
          ? arr.map((obj, index) => {
              return (
                <NestedObject
                  key={`arr-obj-${obj}-${index}`}
                  parentKey={index.toString()}
                  nestedObj={obj}
                  iteration={iteration + 1}
                />
              );
            })
          : 'empty'}
      </div>
    </React.Fragment>
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
        ) : isArray(value) && isObject((value as unknown[])[0]) ? (
          <NestedArray
            iteration={iteration}
            parentKey={objectKey}
            arr={value as Record<string, unknown>[]}
          />
        ) : null}
      </div>
    );
  });
}
