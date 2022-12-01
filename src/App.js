import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState('');
  const [listaTarefa, setListaTarefa] = useState([]);
  

  useEffect(() => {
    buscar();
    }, []);

  function buscar() {
    axios.get('http://localhost:3100/tarefa').then(resultado => {
      setListaTarefa(resultado.data);
    });
  }

  function salvar(event) {
    event.preventDefault();

    let tarefa = {
      codigo: codigo,
      descricao: descricao
    };

    axios.put('http://localhost:3100/tarefa', tarefa).then(() => {
      buscar();

      setCodigo();
      setDescricao('');
    });
  }

  function excluir(tarefa) {
    axios.delete(`http://localhost:3100/tarefa/${tarefa.codigo}`).then((result) => {
      buscar();
    });
  }

  function editar(tarefa) {
    axios.get(`http://localhost:3100/tarefa/${tarefa.codigo}`).then((result) => {
      setCodigo(result.data.codigo);
      setDescricao(result.data.descricao);
    });
  }

  return (
    <div className="container">

      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <form onSubmit={(event) => salvar(event)}>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Example label</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"></input>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Another label</label>
          <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"></input>
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button">Button</button>
          <button class="btn btn-primary" type="button">Button</button>
        </div>
      </form>

      <form onSubmit={(event) => salvar(event)}>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input type="text" className="form-control"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>

      <h3>Lista de Tarefa</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Tarefa</th>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {listaTarefa.map((tarefa, index) => (
            <tr key={index}>
              <td>{tarefa.descricao}</td>
              <td>
                <button type='button' className="btn btn-primary"
                onClick={(event) => editar(tarefa)}>Editar</button>

                <button type='button' className="btn btn-danger"
                onClick={(event) => excluir(tarefa)}>Excluir</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;