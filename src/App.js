import React, { useState, useEffect } from "react"

import "./styles.css"
import api from "./services/api"

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  /**
   * Função para adicionar um repositório
   */
  async function handleAddRepository() {
    /**
     * Faz a requisição para a API para inserir o repositório
     */
    api.post('repositories', { title: 'Teste', url: 'https://github.com', techs: []}).then(response => {
      /**
       * Se deu tudo certo, atualiza o state
       */
      if (response.status === 200) {
        setRepositories([
          ...repositories,
          {
            id: response.data.id,
            url: response.data.url,
            title: response.data.title,
            techs: response.data.techs,
          }
        ])
      }
    })
  }

  /**
   * Função para remover um repositório 
   * @param int id 
   */
  async function handleRemoveRepository(id) {
    /**
     * Busca a posição que o repositório está no state, para remover ele depois
     */
    const repositoryIndex = repositories.findIndex(e => e.id === id)

    /**
     * Faz a requisição para a API para remover o repositório
     */
    api.delete(`repositories/${id}`).then(response => {
      /**
       * Se deu tudo certo, remove do state
       */
      if (response.status === 204) {
        const data = repositories
        data.splice(repositoryIndex, 1)

        setRepositories([ ...data ])
      }
    })
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
          )   
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App
