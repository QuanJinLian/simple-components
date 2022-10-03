import React from 'react';
import './tooltipPage.scss';
import { Tooltip } from '../../components';

const InnerComponent = () => {
  return (
    <div className="inner">
      <div>TL</div>
      <div>TL</div>
      <div>TL</div>
    </div>
  );
};

const TextTest = () => {
  return <InnerComponent />;
};

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
    <>
      <div className="demo" style={{ marginTop: '100px', marginLeft: '100px' }}>
        <div
          className="top"
          style={{
            marginLeft: buttonWidth,
            whiteSpace: 'nowrap',
          }}
        >
          <Tooltip placement="top-left" title={text}>
            {/*<button>TL</button>*/}
            <TextTest />
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
      <div className="demo2" style={{ marginTop: '50px', marginLeft: '100px' }}>
        <div
          style={{
            marginLeft: buttonWidth,
            whiteSpace: 'nowrap',
          }}
        >
          <Tooltip placement="top-left" title={text} overlayClassName="enter-delay">
            <button>enter-delay 1s</button>
          </Tooltip>
          <Tooltip placement="top" title={text} overlayClassName="leave-delay">
            <button>leave-delay 1s</button>
          </Tooltip>
          <Tooltip placement="top-right" title={text} overlayClassName="hover-view">
            <button>hover not hidden</button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
