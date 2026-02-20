<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Card, CardBack } from '../game/Card';
import { emitDrawCard, emitPlayCard } from '../../socket/socket';
import type { CardInstance, Player } from '@shared/types';
import { CARD_DATABASE } from '@shared/types';

<<<<<<< HEAD
// Fullscreen helper
const requestFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if ((elem as any).webkitRequestFullscreen) {
    (elem as any).webkitRequestFullscreen();
  } else if ((elem as any).msRequestFullscreen) {
    (elem as any).msRequestFullscreen();
  }
};

=======
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
export function GameBoard() {
  const gameState = useGameStore((state) => state.gameState);
  const myHand = useGameStore((state) => state.myHand);
  const playerId = useGameStore((state) => state.playerId);
  const isMyTurn = useGameStore((state) => state.isMyTurn);
  const turnsRemaining = useGameStore((state) => state.turnsRemaining);
  const selectedCards = useGameStore((state) => state.selectedCards);
  const openModal = useGameStore((state) => state.openModal);
  const addToast = useGameStore((state) => state.addToast);
  const activeModal = useGameStore((state) => state.activeModal);
  const reactionWindowActive = useGameStore((state) => state.reactionWindowActive);
  
  const [pendingCard, setPendingCard] = useState<CardInstance | null>(null);
<<<<<<< HEAD
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);
=======
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e

  // Clear pendingCard when relevant modals close (not target-select or card-type-select)
  useEffect(() => {
    if (pendingCard && activeModal !== 'target-select' && activeModal !== 'card-type-select') {
      setPendingCard(null);
    }
  }, [activeModal]);

  // Also clear pendingCard when it's no longer in hand (was played)
  useEffect(() => {
    if (pendingCard && !myHand.some(c => c.instanceId === pendingCard.instanceId)) {
      setPendingCard(null);
    }
  }, [myHand, pendingCard]);

  if (!gameState) {
    return <div className="flex-1 flex items-center justify-center text-papyrus">Loading game...</div>;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const otherPlayers = gameState.players.filter(p => p.id !== playerId);
  const myPlayer = gameState.players.find(p => p.id === playerId);

  const handleCardClick = (card: CardInstance) => {
    // Block card plays during reaction window (except handled by modal)
    if (reactionWindowActive) {
      addToast('Wait for reaction window to end!', 'warning');
      return;
    }
    
    if (!isMyTurn) {
      addToast("It's not your turn!", 'warning');
      return;
    }

    const cardDef = CARD_DATABASE[card.cardId];

    // Check if it's a half card
    if (cardDef.isHalf) {
      const count = myHand.filter(c => c.cardId === card.cardId).length;
      if (count < 2) {
        addToast('Half cards require 2 copies to play!', 'warning');
        return;
      }
    }

    // Check if card needs a target
    const cardsNeedingTarget = [
      'me_or_you', 'spellbound', 'criminal_mummy', 'give_and_take',
      'all_or_nothing', 'this_is_on_you'
    ];

    if (cardsNeedingTarget.includes(card.cardId)) {
      // Open target selection modal
      setPendingCard(card);
      const alivePlayers = otherPlayers.filter(p => p.isAlive);
      openModal('target-select', { targetPlayers: alivePlayers });
      return;
    }

    // Special handling for spellbound (needs card type selection too)
    // This is handled after target selection in modal

    // Play the card directly
    emitPlayCard(card.instanceId);
  };

  const handleDrawCard = () => {
    if (!isMyTurn) {
      addToast("It's not your turn!", 'warning');
      return;
    }
    emitDrawCard();
  };

  const handleTargetSelect = (targetId: string): boolean => {
    if (!pendingCard) return false;

    if (pendingCard.cardId === 'spellbound') {
      // Emit the card play first to consume the card
      emitPlayCard(pendingCard.instanceId, targetId);
      // Then open card type selection modal
      openModal('card-type-select', { spellboundTargetId: targetId });
      setPendingCard(null);
      return true; // Keep target modal from closing since we're opening another
    } else {
      emitPlayCard(pendingCard.instanceId, targetId);
      setPendingCard(null);
      return false;
    }
  };

  // Subscribe to target selection from modal
  const setTargetSelectCallback = (callback: (targetId: string) => void) => {
    (window as any).__targetSelectCallback = callback;
  };
  setTargetSelectCallback(handleTargetSelect);

  return (
    <div 
<<<<<<< HEAD
      className="game-board flex-1 flex flex-col h-full"
      style={{
        backgroundImage: 'url(/Assests/menu_background.png)',
=======
      className="game-board flex-1 flex flex-col"
      style={{
        backgroundImage: 'url(/menu_background.png)',
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
<<<<<<< HEAD
      {/* Fullscreen button - mobile only */}
      {!isFullscreen && (
        <button
          onClick={requestFullscreen}
          className="fixed top-2 right-2 z-50 bg-black/60 text-papyrus px-2 py-1 rounded text-xs md:hidden"
        >
          ⛶ Fullscreen
        </button>
      )}

      {/* Top area - Other players */}
      <div className="flex justify-center gap-2 md:gap-4 p-1 md:p-2 flex-shrink-0">
=======
      {/* Top area - Other players */}
      <div className="flex justify-center gap-4 p-2">
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        {otherPlayers.map((player) => (
          <PlayerDisplay 
            key={player.id} 
            player={player} 
            isCurrentTurn={currentPlayer?.id === player.id}
          />
        ))}
      </div>

      {/* Middle area - Deck and discard */}
<<<<<<< HEAD
      <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 min-h-0">
        {/* Deck */}
        <motion.div
          className="deck-pile scale-75 md:scale-100"
=======
      <div className="flex-1 flex items-center justify-center gap-8">
        {/* Deck */}
        <motion.div
          className="deck-pile"
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          data-count={gameState.deckCount}
          whileHover={isMyTurn ? { scale: 1.05 } : {}}
          onClick={handleDrawCard}
        >
          <CardBack size="large" />
<<<<<<< HEAD
          <p className="text-center text-papyrus text-xs md:text-base mt-1">Deck</p>
=======
          <p className="text-center text-papyrus mt-2">Deck</p>
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        </motion.div>

        {/* Turn info */}
        <div className="text-center">
          <motion.div
            key={currentPlayer?.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
<<<<<<< HEAD
            className="bg-black/60 rounded-lg px-3 py-2 md:px-6 md:py-3"
          >
            <p className="text-papyrus text-xs md:text-base mb-1">
              {currentPlayer?.id === playerId ? "Your Turn!" : `${currentPlayer?.name}'s Turn`}
            </p>
            {turnsRemaining > 1 && (
              <p className="text-egyptian-gold text-xs">
=======
            className="bg-black/60 rounded-lg px-6 py-3"
          >
            <p className="text-papyrus mb-1">
              {currentPlayer?.id === playerId ? "Your Turn!" : `${currentPlayer?.name}'s Turn`}
            </p>
            {turnsRemaining > 1 && (
              <p className="text-egyptian-gold text-sm">
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
                {turnsRemaining} turns remaining
              </p>
            )}
          </motion.div>
        </div>

        {/* Discard pile */}
<<<<<<< HEAD
        <div className="relative scale-75 md:scale-100">
=======
        <div className="relative">
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          {gameState.discardPile.length > 0 ? (
            <Card 
              cardId={gameState.discardPile[gameState.discardPile.length - 1]} 
              size="large"
              disabled
            />
          ) : (
<<<<<<< HEAD
            <div className="w-24 h-36 md:w-32 md:h-48 border-2 border-dashed border-papyrus/30 rounded-lg flex items-center justify-center">
              <p className="text-papyrus/40 text-center text-xs">Discard</p>
            </div>
          )}
          <p className="text-center text-papyrus text-xs md:text-base mt-1">Discard ({gameState.discardPile.length})</p>
=======
            <div className="w-32 h-48 border-2 border-dashed border-papyrus/30 rounded-lg flex items-center justify-center">
              <p className="text-papyrus/40 text-center text-sm">Discard</p>
            </div>
          )}
          <p className="text-center text-papyrus mt-2">Discard ({gameState.discardPile.length})</p>
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        </div>
      </div>

      {/* Bottom area - My hand */}
<<<<<<< HEAD
      <div className="bg-black/50 backdrop-blur-sm p-2 md:p-4 flex-shrink-0">
        {/* My player info */}
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <div className="flex items-center gap-1 md:gap-2">
            <div className={`player-avatar w-6 h-6 md:w-12 md:h-12 text-xs md:text-lg ${isMyTurn ? 'current-turn' : ''}`}>
              {myPlayer?.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-papyrus text-xs md:text-base">{myPlayer?.name}</span>
          </div>
          <span className="text-egyptian-gold text-xs md:text-base">{myHand.length} cards</span>
=======
      <div className="bg-black/50 backdrop-blur-sm p-4">
        {/* My player info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`player-avatar ${isMyTurn ? 'current-turn' : ''}`}>
              {myPlayer?.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-papyrus">{myPlayer?.name} (You)</span>
          </div>
          <span className="text-egyptian-gold">{myHand.length} cards</span>
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        </div>

        {/* Hand */}
        <div className="hand-area">
          <AnimatePresence mode="popLayout">
            {myHand.map((card, index) => (
              <motion.div
                key={card.instanceId}
                layout
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0,
                  transition: { delay: index * 0.05 }
                }}
                exit={{ opacity: 0, y: -50, scale: 0.5 }}
              >
                <Card
                  card={card}
                  selected={selectedCards.includes(card.instanceId)}
                  onClick={() => handleCardClick(card)}
                  disabled={!isMyTurn}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Draw button for mobile */}
        {isMyTurn && (
          <motion.button
<<<<<<< HEAD
            className="btn btn-primary w-full mt-1 md:mt-2 py-2 text-sm md:text-base"
            onClick={handleDrawCard}
            whileTap={{ scale: 0.95 }}
          >
            Draw Card
=======
            className="btn btn-primary w-full mt-2"
            onClick={handleDrawCard}
            whileTap={{ scale: 0.95 }}
          >
            Draw Card (End Turn)
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          </motion.button>
        )}
      </div>
    </div>
  );
}

interface PlayerDisplayProps {
  player: Player;
  isCurrentTurn: boolean;
}

function PlayerDisplay({ player, isCurrentTurn }: PlayerDisplayProps) {
  return (
    <motion.div
<<<<<<< HEAD
      className={`bg-black/50 rounded-lg p-1 md:p-2 ${isCurrentTurn ? 'ring-2 ring-green-500' : ''}`}
      animate={isCurrentTurn ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: isCurrentTurn ? Infinity : 0, duration: 1.5 }}
    >
      <div className="flex items-center gap-1 md:gap-2 mb-1">
        <div className={`player-avatar w-5 h-5 md:w-8 md:h-8 text-xs md:text-sm ${!player.isAlive ? 'eliminated' : ''} ${isCurrentTurn ? 'current-turn' : ''}`}>
          {player.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={`text-xs md:text-sm ${player.isAlive ? 'text-papyrus' : 'text-papyrus/50 line-through'}`}>
            {player.name}
          </p>
          {!player.isAlive && <p className="text-mummy-red text-xs">☠️</p>}
=======
      className={`bg-black/50 rounded-lg p-2 ${isCurrentTurn ? 'ring-2 ring-green-500' : ''}`}
      animate={isCurrentTurn ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: isCurrentTurn ? Infinity : 0, duration: 1.5 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`player-avatar w-8 h-8 text-sm ${!player.isAlive ? 'eliminated' : ''} ${isCurrentTurn ? 'current-turn' : ''}`}>
          {player.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={`text-sm ${player.isAlive ? 'text-papyrus' : 'text-papyrus/50 line-through'}`}>
            {player.name}
          </p>
          {!player.isAlive && <p className="text-mummy-red text-xs">☠️ Mummified</p>}
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        </div>
      </div>
      
      {player.isAlive && (
<<<<<<< HEAD
        <div className="flex gap-0.5 justify-center">
          {Array.from({ length: Math.min(player.cardCount, 6) }).map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-3 md:w-4 md:h-6 bg-gradient-to-br from-egyptian-gold to-sand rounded shadow-sm"
            />
          ))}
          {player.cardCount > 6 && (
            <span className="text-egyptian-gold text-xs">+{player.cardCount - 6}</span>
=======
        <div className="flex gap-1 justify-center">
          {Array.from({ length: Math.min(player.cardCount, 8) }).map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-6 bg-gradient-to-br from-egyptian-gold to-sand rounded shadow-sm"
            />
          ))}
          {player.cardCount > 8 && (
            <span className="text-egyptian-gold text-xs">+{player.cardCount - 8}</span>
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          )}
        </div>
      )}
    </motion.div>
  );
}
