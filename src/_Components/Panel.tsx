import React, { useEffect, useState, useReducer } from 'react';
import styled from '@emotion/styled';
import { createDeck, drawCard } from '../_Api/api';
import { Button, Box, Modal as MuiModal, Typography } from '@mui/material';
import { IGameState, reducerAction } from '../_Api/types';
import { compareCards } from './gameLogic';
import { SideCardsPanel } from './SideCardsPanel';
import { colors } from '../styles/colors';
import CloseIcon from '@mui/icons-material/Close';
import CasinoIcon from '@mui/icons-material/Casino';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import StartIcon from '@mui/icons-material/Start';
import { RoundHistory } from './RoundHistory';
import './Panel.css';

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const modalBoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '0.2rem solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const StyledButton = styled(Button)`
  margin: 2rem 1rem 2rem 0;
  padding: 1.2rem 2rem;
  font-size: 1rem;
`;

const StyledLoadingButton = styled(Button)`
  padding: 1.2rem 2rem;
  font-size: 1rem;
`;

const initialState: IGameState = {
  deckId: '',
  cards: [],
  rounds: [{ round: 1, score: 0 }],
  score: 0,
};

function gameReducer(
  prevState = initialState,
  action: reducerAction
): IGameState {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        ...prevState,
        cards: [action.payload, ...prevState.cards],
      };

    case 'SET_DECK_ID':
      return {
        ...prevState,
        deckId: action.payload,
      };

    case 'SET_ROUND':
      const roundInfo = {
        round: prevState.rounds[0].round + 1,
        score: prevState.score,
      };
      return {
        ...prevState,
        rounds: [roundInfo, ...prevState.rounds],
      };

    case 'SET_SCORE':
      const result = compareCards(prevState.cards[0], prevState.cards[1]);

      if (result === action.payload) {
        return {
          ...prevState,
          score: prevState.score + 0.1,
        };
      } else {
        return {
          ...prevState,
          score: prevState.score,
        };
      }

    case 'LOAD_GAME':
      return {
        deckId: action.payload.deckId,
        cards: action.payload.cards,
        rounds: action.payload.roundHistory,
        score: action.payload.score,
      };

    default:
      console.log('Sumting rong');
      return prevState;
  }
}

export const Panel = () => {
  const [{ cards, deckId, score, rounds }, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [higherCard, setHigherCard] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async function () {
      draftCard(await setDeck());
    })();

    if (localStorage.getItem('gameData')!) {
      handleOpen();
    }
  }, []);

  /* Saving the game data to a cookie when the user closes the browser window. */
  window.onbeforeunload = function () {
    saveGame();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * saves the game data to local storage
   */
  const saveGame = () => {
    const gameData = {
      roundHistory: rounds,
      deckId: deckId,
      score: score,
      cards: cards,
    };

    localStorage.setItem('gameData', JSON.stringify(gameData));
  };

  /**
   * It takes the data from local storage, parses it, and then dispatches setting the state of the game to the current state
   */
  const loadGame = () => {
    const gameData = JSON.parse(localStorage.getItem('gameData')!);
    dispatch({
      type: 'LOAD_GAME',
      payload: gameData,
    });
    handleClose();
  };

  /**
   * It takes a deckId, sets the loading state to true, then calls the drawCard function, which returns a
   * cardData object. It then dispatches the cardData object to the reducer, and sets the loading state
   * to false
   * @param {string} deckId - string - The deck id that you want to draw a card from.
   */
  const draftCard = async (deckId: string) => {
    setIsLoading(true);
    const cardData = await drawCard(deckId);

    dispatch({
      type: 'SET_CARDS',
      payload: cardData.cards[0],
    });

    setIsLoading(false);
  };

  /**
   * It creates a deck of cards and sets the deck id in the state.
   * @returns The deck id is being returned.
   */
  const setDeck = async () => {
    setIsLoading(true);
    const deckData = await createDeck();
    dispatch({
      type: 'SET_DECK_ID',
      payload: deckData.deck_id,
    });

    setIsLoading(false);
    return deckData.deck_id;
  };

  /**
   * It drafts a card from the deck, sets the score to the higher card, and increments the round and the score based on calculation output
   */
  const draftCardAndCalculateRoundResult = async () => {
    await draftCard(deckId);

    dispatch({
      type: 'SET_SCORE',
      payload: higherCard,
    });

    dispatch({
      type: 'SET_ROUND',
    });
  };

  return (
    <Wrapper>
      <Box
        sx={{
          marginBottom: '5rem',
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledButton
          disabled={cards?.length > 29 || isLoading}
          onClick={() => draftCardAndCalculateRoundResult()}
          variant={'contained'}
        >
          <CasinoIcon sx={{ mr: 2 }} />
          Draw a card
        </StyledButton>
        <StyledLoadingButton
          disabled={cards?.length > 29 || isLoading}
          onClick={() => saveGame()}
          variant={'contained'}
        >
          <DownloadIcon sx={{ mr: 2 }} />
          save game
        </StyledLoadingButton>
      </Box>

      {cards && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledButton
              disabled={cards?.length > 29 || isLoading}
              onClick={() => {
                setHigherCard(true);
              }}
              style={{ marginBottom: '1rem', marginTop: 0 }}
              variant={!higherCard ? 'contained' : 'outlined'}
            >
              <ArrowCircleUpIcon sx={{ mr: 2 }} />
              Higher card
            </StyledButton>
            <StyledButton
              disabled={cards?.length > 29 || isLoading}
              onClick={() => setHigherCard(false)}
              style={{ marginBottom: '1rem', marginTop: 0 }}
              variant={higherCard ? 'contained' : 'outlined'}
            >
              <ArrowCircleDownIcon sx={{ mr: 2 }} />
              Lower card
            </StyledButton>{' '}
          </Box>
          <img
            alt={`card ${cards.at(0)?.value} ${cards.at(0)?.suit}`}
            src={cards.at(0)?.image}
            style={{ height: 'calc(100vh - 600px)', maxHeight: '350px' }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          bottom: '2rem',
        }}
      >
        <img
          className="backgroundCard"
          alt={`card ${cards.at(0)?.value} ${cards.at(0)?.suit}`}
          src={cards.at(0)?.image}
        />
        <Typography
          component="p"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.5rem',
            fontSize: '2rem',
            fontFamily: 'Monoton',
            textShadow: ` 0 0 0.7rem ${colors.snowWhite}, 0 0 1rem ${colors.snowWhite}, 0 0 2.1rem ${colors.snowWhite}, 0 0 4.2rem ${colors.vibrantTeal}, 0 0 8.2rem ${colors.vibrantTeal}, 0 0 9.2rem ${colors.vibrantTeal}, 0 0 10.2rem ${colors.vibrantTeal}, 0 0 15.1rem ${colors.vibrantTeal}`,
          }}
        >
          Score
          <span style={{ letterSpacing: '0', fontSize: '2rem' }}>
            {' '}
            {score.toFixed(1)}
          </span>
        </Typography>
        <Typography
          component="p"
          sx={{
            textTransform: 'uppercase',
            fontSize: '2rem',
            letterSpacing: '0.5rem',
            fontFamily: 'Monoton',
            textShadow: ` 0 0 0.7rem ${colors.snowWhite}, 0 0 1rem ${colors.snowWhite}, 0 0 2.1rem ${colors.snowWhite}, 0 0 4.2rem ${colors.vibrantTeal}, 0 0 8.2rem ${colors.vibrantTeal}, 0 0 9.2rem ${colors.vibrantTeal}, 0 0 10.2rem ${colors.vibrantTeal}, 0 0 15.1rem ${colors.vibrantTeal}`,
          }}
        >
          Round
          <span style={{ letterSpacing: '0', fontSize: '2rem' }}>
            {' '}
            {rounds[0].round}
          </span>
        </Typography>
      </Box>

      <RoundHistory rounds={rounds} />

      <Box
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
        }}
      >
        {cards && <SideCardsPanel cards={cards} />}
      </Box>

      <MuiModal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...modalBoxStyle,
          }}
        >
          <Typography
            component="p"
            sx={{
              fontFamily: 'Monoton',
              fontSize: '3rem',
              marginBottom: '3rem',
            }}
          >
            The game is still on!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              fontSize: '1.0rem',
              gap: '0.5rem',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledLoadingButton
              disabled={cards?.length > 29 || isLoading}
              onClick={() => loadGame()}
              variant={'contained'}
            >
              <FileUploadIcon sx={{ mr: 2 }} />
              load game
            </StyledLoadingButton>
            <StyledLoadingButton
              disabled={cards?.length > 29 || isLoading}
              onClick={handleClose}
              variant={'contained'}
            >
              <StartIcon sx={{ mr: 2 }} />
              no! lets start fresh!
            </StyledLoadingButton>
          </Box>
          <Button
            sx={{
              padding: '0.6rem',
              margin: '3rem auto 0 auto',
            }}
            onClick={handleClose}
            variant={'outlined'}
          >
            <CloseIcon />
          </Button>
        </Box>
      </MuiModal>
    </Wrapper>
  );
};
