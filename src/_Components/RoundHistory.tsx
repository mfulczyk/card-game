import React, { FC } from 'react';
import { IRound } from '../_Api/types';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

type RoundHistoryProps = {
  rounds: IRound[];
};

const RoundHistoryContainer = styled.div`
  padding: 15px;
  height: 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

export const RoundHistory: FC<RoundHistoryProps> = ({ rounds }) => {
  return (
    <RoundHistoryContainer>
      {rounds.map((round: IRound, index) => (
        <Typography
          key={index}
          sx={{
            fontFamily: 'Monoton',
            fontSize: '1rem',
            marginBottom: '3rem',
          }}
        >
          <div>Round {round?.round}</div>
          <div>Score: {round?.score.toFixed(1)}</div>
        </Typography>
      ))}
    </RoundHistoryContainer>
  );
};
