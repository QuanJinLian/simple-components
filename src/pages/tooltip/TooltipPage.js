import React from 'react';
import { Tooltip } from '../../components/tooltip';
import './tooltipPage.scss';

const text = (
  <div>
    <span style={{ display: 'flex' }}>prompt text </span>
    <span style={{ display: 'flex' }}>prompt text </span>
    <span style={{ display: 'flex' }}>prompt text </span>
  </div>
);
const buttonWidth = 70;
export function TooltipPage() {
  return (
    <div className="demo" style={{ marginTop: '100px', marginLeft: '100px' }}>
      <div
        style={{
          marginLeft: buttonWidth,
          whiteSpace: 'nowrap',
        }}
      >
        <Tooltip placement="top-left" title={text}>
          <button>TL</button>
        </Tooltip>
        <Tooltip placement="top" title={text}>
          <button>Top</button>
        </Tooltip>
        <Tooltip placement="top-right" title={text}>
          <button>TR</button>
        </Tooltip>
      </div>
      <div
        style={{
          width: buttonWidth,
          float: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tooltip placement="left-top" title={text}>
          <button>LT</button>
        </Tooltip>
        <Tooltip placement="left" title={text}>
          <button>Left</button>
        </Tooltip>
        <Tooltip placement="left-bottom" title={text}>
          <button>LB</button>
        </Tooltip>
      </div>
      <div
        style={{
          width: buttonWidth,
          marginLeft: buttonWidth * 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tooltip placement="right-top" title={text}>
          <button>RT</button>
        </Tooltip>
        <Tooltip placement="right" title={text}>
          <button>Right</button>
        </Tooltip>
        <Tooltip placement="right-bottom" title={text}>
          <button>RB</button>
        </Tooltip>
      </div>
      <div
        style={{
          marginLeft: buttonWidth,
          clear: 'both',
          whiteSpace: 'nowrap',
        }}
      >
        <Tooltip placement="bottom-left" title={text}>
          <button>BL</button>
        </Tooltip>
        <Tooltip placement="bottom" title={text}>
          <button>Bottom</button>
        </Tooltip>
        <Tooltip placement="bottom-right" title={text}>
          <button>BR</button>
        </Tooltip>
      </div>
    </div>
  );
}
