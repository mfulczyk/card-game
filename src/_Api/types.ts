export interface IResource {
  name: string;
}

export interface IPerson extends IResource {
  mass: number;
  height: number;
}

export interface ICard {
  cards: any;
  code: string;
  image: string;
  images: { svg: string; png: string };
  suit: string;
  value: string;
}

export interface IDraftedCard {
  cards: ICard[];
  deck_id: string;
  remaining: number;
  success: boolean;
}

export interface IRound {
  round: number;
  score: number;
}

export interface IGameState {
  deckId: string;
  cards: ICard[];
  rounds: IRound[];
  score: number;
}

export interface setDeckIdAction {
  type: 'SET_DECK_ID';
  payload: string;
}

export interface setCardsAction {
  type: 'SET_CARDS';
  payload: ICard;
}

export interface setRoundAction {
  type: 'SET_ROUND';
}

export interface setScoreAction {
  type: 'SET_SCORE';
  payload: boolean;
}

export interface loadGameAction {
  type: 'LOAD_GAME';
  payload: {
    deckId: string;
    roundHistory: IRound[];
    score: number;
    cards: ICard[];
  };
}

export type reducerAction =
  | setDeckIdAction
  | setCardsAction
  | setRoundAction
  | setScoreAction
  | loadGameAction;
