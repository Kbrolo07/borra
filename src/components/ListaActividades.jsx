import { useState, useEffect } from 'react';

export default function ListaActividades() {
  // CAPA 1: Memoria del componente (Estados)
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Reemplaza esta URL con tu endpoint real de NocoDB Cloud
 const NOCODB_URL = 'https://app.nocodb.com/api/v3/data/psghzn1ry3yuha7/m6vsgx29d6xhm12/records?pageSize=25';
const API_TOKEN = 'nc_pat_FasrCh7bSAjBltkCwHilDiDyQGVB09LtLPGnY6SE';

  // CAPA 2: El mensajero asincrónico (useEffect + fetch GET)
  useEffect(() => {
    fetch(NOCODB_URL, {
      method: 'GET',
      headers: { 
        'xc-token': API_TOKEN, 
        'Content-Type': 'application/json' 
      }
    })
    .then(res => res.json())
    .then(datos => {
      // Extraemos los registros de forma segura (respaldo para list o records)
      const registros = datos.records || datos.list || [];
      setActividades(registros);
      setCargando(false); // Apagamos la carga con éxito
    })
    .catch(error => {
      console.error('Error al conectar con NocoDB:', error);
      // ¡SALVAVIDAS CRUCIAL!: Aunque falle la red, apagamos la carga para no congelar la pantalla
      setCargando(false); 
    });
  }, []);

  // CAPA 3: Semáforo de carga condicional
  if (cargando) return <p>Cargando datos desde la nube...</p>;

  // CAPA 4: Renderizado visual (.map extrayendo la gaveta 'fields')
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ color: '#0f4c81' }}>📋 Lista de Actividades (Desde NocoDB)</h3>
      
      {actividades.length === 0 ? (
        <p>No se encontraron registros o la tabla está vacía.</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {actividades.map((item, index) => {
            // NocoDB guarda los datos dentro de la gaveta 'fields'
            const campos = item.fields || item;
            return (
              <li key={item.id || index} style={{ marginBottom: '6px' }}>
                <strong>{campos.Titulo || campos.title || 'Sin título'}</strong> — {campos.Duracion || campos.duration || 0} min
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}