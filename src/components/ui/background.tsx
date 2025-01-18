'use client'
import React from 'react';
import styled from 'styled-components';

const Background = () => {
  return (
    <StyledWrapper>
      <div className="container min-w-full min-h-full" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100vw;
    height: 100vh;

    background: #000000;
    --gap: 5em;
    --line: 1px;
    --color: rgba(255, 255, 255, 0.2);

    background-image: linear-gradient(
        -90deg,
        transparent calc(var(--gap) - var(--line)),
        var(--color) calc(var(--gap) - var(--line) + 1px),
        var(--color) var(--gap)
      ),
      linear-gradient(
        0deg,
        transparent calc(var(--gap) - var(--line)),
        var(--color) calc(var(--gap) - var(--line) + 1px),
        var(--color) var(--gap)
      );
    background-size: var(--gap) var(--gap);
  }`;

export default Background;
