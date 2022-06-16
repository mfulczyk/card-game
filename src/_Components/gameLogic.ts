import { ICard } from './../_Api/types';

/**
 * If card1 is greater than card2, return true, otherwise return false.
 * @param {ICard} card1 - ICard,
 * @param {ICard} card2 - ICard
 * @returns a boolean value.
 */

export const compareCards = (card1: ICard, card2: ICard) => {
  //   ACE = 14
  //   KING = 13
  //   QUEEN = 12
  //   JACK = 11

  /* Converting the string value of the card to an integer. */

  const card1ValueToInt =
    card1.value === 'JACK'
      ? 11
      : card1.value === 'QUEEN'
      ? 12
      : card1.value === 'KING'
      ? 13
      : card1.value === 'ACE'
      ? 14
      : parseInt(card1.value);

  /* Converting the string value of the card to an integer. */

  const card2ValueToInt =
    card2.value === 'JACK'
      ? 11
      : card2.value === 'QUEEN'
      ? 12
      : card2.value === 'KING'
      ? 13
      : card2.value === 'ACE'
      ? 14
      : parseInt(card2.value);

  if (card1ValueToInt === card2ValueToInt) {
    return false;
  }

  if (card1ValueToInt > card2ValueToInt) {
    return true;
  }

  if (card1ValueToInt < card2ValueToInt) {
    return false;
  }
};
