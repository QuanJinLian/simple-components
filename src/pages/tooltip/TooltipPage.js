import React, { useState, useEffect } from 'react';
import './tooltipPage.scss';
import { Toast, toastService, Tooltip } from '../../components';

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

const Comfirm = placement => {
  const yesOnclick = () => {
    toastService.add(`${placement} tooltip confirm clicked on Yes.`, 1);
  };

  return (
    <div className="comfirmWrapper">
      <span className="anticon anticon-exclamation-circle">
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="exclamation-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
        </svg>
      </span>
      <div className="ant-popover-message-title">Are you sure to delete this task?</div>
      <div className="ant-popover-buttons">
        <button onClick={yesOnclick} type="button" className="ant-btn ant-btn-primary ant-btn-sm">
          <span>Yes</span>
        </button>
      </div>
    </div>
  );
};

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
      <div className="demo3">
        <div className="top-wrapper">
          <Tooltip placement="top" title={Comfirm('top')} overlayClassName={`leave-delay hover-view comfirmTooltip`}>
            <button className="test-button">Top</button>
          </Tooltip>
        </div>
        <div className="left-wrapper">
          <Tooltip placement="left" title={Comfirm('left')} overlayClassName={`leave-delay hover-view comfirmTooltip`}>
            <button className="test-button">Left</button>
          </Tooltip>
        </div>
        <div className="right-wrapper">
          <Tooltip
            placement="right"
            title={Comfirm('right')}
            overlayClassName={`leave-delay hover-view comfirmTooltip`}
          >
            <button className="test-button">Right</button>
          </Tooltip>
        </div>
        <div className="bottom-wrapper">
          <Tooltip
            placement="bottom"
            title={Comfirm('bottom')}
            overlayClassName={`leave-delay hover-view comfirmTooltip`}
          >
            <button className="test-button">Bottom</button>
          </Tooltip>
        </div>
      </div>
      <Toast />
    </>
  );
}
