import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function MainMenu() {
  const [playerName, setPlayerName] = useState('');
  const setScreen = useGameStore((state) => state.setScreen);
  const setPlayerNameInStore = useGameStore((state) => state.setPlayerName);
  const isConnected = useGameStore((state) => state.isConnected);

  const handlePlay = () => {
    if (!playerName.trim()) {
      useGameStore.getState().addToast('Please enter your name!', 'warning');
      return;
    }
    setPlayerNameInStore(playerName.trim());
    setScreen('lobby');
  };

  return (
    <div 
<<<<<<< HEAD
      className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 overflow-hidden"
      style={{
        backgroundImage: 'url(/Assests/menu_background.png)',
=======
      className="flex-1 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/menu_background.png)',
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
<<<<<<< HEAD
        className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 md:p-8 max-w-md w-full"
      >
        {/* Logo */}
        <motion.img
          src="/Assests/ui_logo.png"
          alt="Khofo Card Game"
          className="w-24 h-24 md:w-48 md:h-48 mx-auto mb-3 md:mb-6 object-contain"
=======
        className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full"
      >
        {/* Logo */}
        <motion.img
          src="/ui_logo.png"
          alt="Mummy Card Game"
          className="w-48 h-48 mx-auto mb-6 object-contain"
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        
<<<<<<< HEAD
        <h1 className="text-xl md:text-3xl font-bold text-center text-egyptian-gold mb-1 md:mb-2">
          Khofo Card Game
        </h1>
        <h2 className="text-base md:text-xl text-center text-papyrus mb-4 md:mb-8" dir="rtl">
=======
        <h1 className="text-3xl font-bold text-center text-egyptian-gold mb-2">
          Mummy Card Game
        </h1>
        <h2 className="text-xl text-center text-papyrus mb-8" dir="rtl">
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          هتتحنط هنا
        </h2>

        {/* Connection status */}
<<<<<<< HEAD
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-6">
          <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs md:text-sm text-papyrus">
            {isConnected ? 'Connected' : 'Connecting...'}
=======
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-papyrus">
            {isConnected ? 'Connected to server' : 'Connecting...'}
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          </span>
        </div>

        {/* Name input */}
<<<<<<< HEAD
        <div className="mb-4 md:mb-6">
          <label className="block text-papyrus text-sm md:text-base mb-1 md:mb-2">Your Name</label>
=======
        <div className="mb-6">
          <label className="block text-papyrus mb-2">Your Name</label>
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name..."
<<<<<<< HEAD
            className="w-full text-sm md:text-base"
=======
            className="w-full"
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
            maxLength={20}
            onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
          />
        </div>

        {/* Play button */}
        <motion.button
<<<<<<< HEAD
          className="btn btn-primary w-full text-base md:text-xl py-2 md:py-3"
=======
          className="btn btn-primary w-full text-xl"
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          onClick={handlePlay}
          disabled={!isConnected}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Play Game
        </motion.button>
      </motion.div>
    </div>
  );
}
