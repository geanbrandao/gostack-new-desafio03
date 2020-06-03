import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  // guarda as informacoes que sao exibidas na pagina
  const [repositories, setRepositories] = useState([]);

  // eh chamado para o estado muda e durante o estado inicial []
  useEffect(() => {
    api.get('/repositories').then(response => {
      // como está vazio seta a response inteiro
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `New title ${Date.now()}`,
      url: 'http://github.com/geanbrandao',
      techs: ['Techs 1', 'Techs 3', 'Techs 3']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const index = repositories.findIndex(repo => repo.id === id);

    if (index < 0) {
      return
    }
    setRepositories(repositories.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
