import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { emitCreateRoom, emitJoinRoom, emitGetRooms } from '../../socket/socket';

export function Lobby() {
  const [roomName, setRoomName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [activeTab, setActiveTab] = useState<'create' | 'join' | 'browse'>('create');
  
  const playerName = useGameStore((state) => state.playerName);
  const roomList = useGameStore((state) => state.roomList);
  const setScreen = useGameStore((state) => state.setScreen);

  useEffect(() => {
    emitGetRooms();
    const interval = setInterval(emitGetRooms, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      useGameStore.getState().addToast('Please enter a room name!', 'warning');
      return;
    }
    emitCreateRoom(playerName, roomName.trim());
  };

  const handleJoinByCode = () => {
    if (!joinCode.trim()) {
      useGameStore.getState().addToast('Please enter a room code!', 'warning');
      return;
    }
    emitJoinRoom(playerName, joinCode.trim().toUpperCase());
  };

  const handleJoinRoom = (roomId: string) => {
    emitJoinRoom(playerName, roomId);
  };

  const handleBack = () => {
    setScreen('menu');
  };

  const availableRooms = roomList.filter(r => !r.isPlaying && r.playerCount < r.maxPlayers);

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
<<<<<<< HEAD
        className="bg-black/70 backdrop-blur-sm rounded-2xl p-3 md:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-6">
          <button onClick={handleBack} className="text-egyptian-gold hover:text-yellow-400 text-sm md:text-base">
            ← Back
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-egyptian-gold">Lobby</h1>
          <span className="text-papyrus text-xs md:text-base">{playerName}</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-egyptian-gold/30 mb-3 md:mb-6">
=======
        className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-egyptian-gold hover:text-yellow-400">
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-egyptian-gold">Lobby</h1>
          <span className="text-papyrus">{playerName}</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-egyptian-gold/30 mb-6">
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
          {(['create', 'join', 'browse'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
<<<<<<< HEAD
              className={`flex-1 py-1 md:py-2 text-center capitalize transition-colors text-sm md:text-base ${
=======
              className={`flex-1 py-2 text-center capitalize transition-colors ${
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
                activeTab === tab
                  ? 'text-egyptian-gold border-b-2 border-egyptian-gold'
                  : 'text-papyrus/60 hover:text-papyrus'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Create Tab */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
<<<<<<< HEAD
            <p className="text-papyrus text-sm md:text-base mb-2 md:mb-4">Create a new room for your friends to join.</p>
            
            <div className="mb-3 md:mb-4">
              <label className="block text-papyrus text-sm mb-1 md:mb-2">Room Name</label>
=======
            <p className="text-papyrus mb-4">Create a new room for your friends to join.</p>
            
            <div className="mb-4">
              <label className="block text-papyrus mb-2">Room Name</label>
>>>>>>> 9c508caf08707e2de380b4dcb3437d2548bcd74e
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="My Game Room"
                className="w-full"
                maxLength={30}
              />
            </div>

            <button onClick={handleCreateRoom} className="btn btn-primary w-full">
              Create Room
            </button>
          </motion.div>
        )}

        {/* Join Tab */}
        {activeTab === 'join' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-papyrus mb-4">Enter a room code to join.</p>
            
            <div className="mb-4">
              <label className="block text-papyrus mb-2">Room Code</label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                className="w-full uppercase tracking-widest text-center text-xl"
                maxLength={6}
              />
            </div>

            <button onClick={handleJoinByCode} className="btn btn-primary w-full">
              Join Room
            </button>
          </motion.div>
        )}

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-papyrus mb-4">Available rooms:</p>
            
            {availableRooms.length === 0 ? (
              <p className="text-center text-papyrus/60 py-8">
                No rooms available. Create one!
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    className="bg-nile-blue/50 rounded-lg p-3 flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div>
                      <p className="text-papyrus font-semibold">{room.name}</p>
                      <p className="text-egyptian-gold/60 text-sm">
                        {room.playerCount}/{room.maxPlayers} players
                      </p>
                    </div>
                    <button
                      onClick={() => handleJoinRoom(room.id)}
                      className="btn btn-secondary text-sm py-1 px-3"
                    >
                      Join
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            <button onClick={emitGetRooms} className="btn btn-secondary w-full mt-4">
              Refresh
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
