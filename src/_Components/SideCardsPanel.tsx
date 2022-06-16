import React, { FC } from 'react';
import { ICard } from '../_Api/types';
import styled from '@emotion/styled';

type SideCardsPanelProps = {
  cards: ICard[];
};

const StyledCardContainer = styled.div`
  width: 50%;
  height: 200px;
  padding: 15px;
  //   overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

export const SideCardsPanel: FC<SideCardsPanelProps> = ({ cards }) => {
  return (
    <StyledCardContainer>
      {cards?.slice(1).map((card: ICard, index) => (
        <img
          key={index}
          alt={`card ${card?.value} ${card.suit}`}
          src={card.image}
          width="100%"
          style={{ margin: '0', padding: '0' }}
        />
      ))}
    </StyledCardContainer>
  );
};
