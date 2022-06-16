import ky from 'ky';
import { IDraftedCard } from './types';

export const createDeck = async () => {
  const response = await ky
    .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((response) => response.json().then((json) => json));

  return response;
};

export const drawCard = async (deckId: string): Promise<IDraftedCard> => {
  const response = await ky
    .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((response) => response.json().then((json) => json));

  return response;
};
