import React from 'react';
import './tooltipPage.scss';
import { Tooltip } from '../../components';

const InnerComponent = () => {
  return (
    <div className="test-button">
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
    <span className="prompt-text__span">prompt text </span>
    <span className="prompt-text__span">prompt text </span>
    <span className="prompt-text__span">prompt text </span>
  </div>
);

export function TooltipPage() {
  return (
    <>
      <div className="demo">
        <div className="top-wrapper">
          <Tooltip placement="top-left" title={text}>
            {/*<button>TL</button>*/}
            <TextTest />
          </Tooltip>
          <Tooltip placement="top" title={text}>
            <button className="test-button">Top</button>
          </Tooltip>
          <Tooltip placement="top-right" title={text}>
            <button className="test-button">TR</button>
          </Tooltip>
        </div>
        <div className="left-wrapper">
          <Tooltip placement="left-top" title={text}>
            <button className="test-button">LT</button>
          </Tooltip>
          <Tooltip placement="left" title={text}>
            <button className="test-button">Left</button>
          </Tooltip>
          <Tooltip placement="left-bottom" title={text}>
            <button className="test-button">LB</button>
          </Tooltip>
        </div>
        <div className="right-wrapper">
          <Tooltip placement="right-top" title={text}>
            <button className="test-button">RT</button>
          </Tooltip>
          <Tooltip placement="right" title={text}>
            <button className="test-button">Right</button>
          </Tooltip>
          <Tooltip placement="right-bottom" title={text}>
            <button className="test-button">RB</button>
          </Tooltip>
        </div>
        <div className="bottom-wrapper">
          <Tooltip placement="bottom-left" title={text}>
            <button className="test-button">BL</button>
          </Tooltip>
          <Tooltip placement="bottom" title={text}>
            <button className="test-button">Bottom</button>
          </Tooltip>
          <Tooltip placement="bottom-right" title={text}>
            <button className="test-button">BR</button>
          </Tooltip>
        </div>
      </div>
      <div className="demo2">
        <div>
          <Tooltip placement="top-left" title={text} overlayClassName="enter-delay">
            <button className="test-button">enter-delay 1s</button>
          </Tooltip>
          <Tooltip placement="top" title={text} overlayClassName="leave-delay">
            <button className="test-button">leave-delay 1s</button>
          </Tooltip>
          <Tooltip placement="top-right" title={text} overlayClassName="hover-view">
            <button className="test-button">hover not hidden</button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
