import TetrisGame from '@/components/TetrisGame';

export default function Home() {
  return (
    <main>
      <h1 style={{ 
        textAlign: 'center', 
        color: 'white', 
        fontSize: '3rem', 
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        Tetris Web
      </h1>
      <TetrisGame />
    </main>
  );
}