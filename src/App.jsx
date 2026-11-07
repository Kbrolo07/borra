import ListaActividades from './components/ListaActividades';

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1>Plan de Clase Digital Interactivo</h1>
      <p>Bienvenido al puente entre Frontend (React) y Backend (NocoDB).</p>
      
      {/* Renderizamos nuestro componente conectado a la base de datos */}
      <ListaActividades />
    </div>
  );
}