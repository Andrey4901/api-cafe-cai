import React, { useState, useEffect } from 'react';



function CoffeeGallery() {

  const [coffeeImage, setCoffeeImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);



  // Função para buscar a imagem na API

  const fetchNewCoffee = async () => {
    setLoading(true);
    setError(null);

    try {
      // Agora chamamos o NOSSO próprio backend na porta 3001!
      // Não precisamos mais do timestamp aqui, pois o backend já cuida disso.
      const response = await fetch('http://localhost:3001/api/coffee');
      
      if (!response.ok) {
        throw new Error('Falha ao conectar com o nosso backend local.');
      }

      // Recebemos a resposta limpa do nosso servidor
      const data = await response.json();
      
      setCoffeeImage(data.file);
    } catch (err) {
      setError('Erro de conexão: ' + err.message);
    } finally {
      setLoading(false);
    }
  };



  // useEffect executa a busca automaticamente quando o componente é montado na tela

  useEffect(() => {

    fetchNewCoffee();

  }, []);



  return (

    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center', fontFamily: 'sans-serif' }}>

      <h2>Galeria de Cafés ☕</h2>

      <p style={{ color: '#555' }}>Clique no botão abaixo para servir uma nova xícara!</p>



      <button

        onClick={fetchNewCoffee}

        disabled={loading}

        style={{

          padding: '10px 20px',

          fontSize: '16px',

          cursor: loading ? 'not-allowed' : 'pointer',

          backgroundColor: '#6F4E37',

          color: 'white',

          border: 'none',

          borderRadius: '5px',

          marginBottom: '20px'

        }}

      >

        {loading ? 'Preparando café...' : 'Quero outro Café!'}

      </button>



      {error && <p style={{ color: 'red' }}>{error}</p>}



      {/* Container da imagem com um tamanho fixo para evitar que o layout "pule" */}

      <div style={{

        width: '100%',

        height: '400px',

        backgroundColor: '#f0f0f0',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        borderRadius: '8px',

        overflow: 'hidden'

      }}>

        {loading && !coffeeImage ? (

          <p>Carregando imagem...</p>

        ) : coffeeImage ? (

          <img

            src={coffeeImage}

            alt="Um café delicioso"

            style={{ width: '100%', height: '100%', objectFit: 'cover' }}

          />

        ) : null}

      </div>

    </div>

  );

}



export default CoffeeGallery;