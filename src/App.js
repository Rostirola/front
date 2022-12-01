import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [codigo, setCodigo] = useState();
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [listaLink, setListaLink] = useState([]);


  useEffect(() => {
    buscar();
  }, []);

  function buscar() {
    axios.get('http://localhost:3100/lista').then(resultado => {
      setListaLink(resultado.data);
    });
  }

  function salvar(event) {
    event.preventDefault();

    let lista = {
      codigo: codigo,
      link: link,
      descricao: descricao
    };

    axios.put('http://localhost:3100/lista', lista).then(() => {
      buscar();

      setCodigo();
      setLink('');
      setDescricao('');
    });
  }

  function excluir(lista) {
    axios.delete(`http://localhost:3100/lista/${lista.codigo}`).then((result) => {
      buscar();
    });
  }

  function editar(lista) {
    axios.get(`http://localhost:3100/lista/${lista.codigo}`).then((result) => {
      setCodigo(result.data.codigo);
      setLink(result.data.link);
      setDescricao(result.data.descricao);
    });
  }


  return (
    <><div className="container">
      <div className="card-group">
        <div className="card">
          <img src="https://github.com/Rostirola.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Juan Rostirola</h5>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img src="https://github.com/arthurzinho10.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Arthur Foesch</h5>
            <p className="card-text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img src="https://github.com/Schreiner210.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Lucas Schreiner</h5>
            <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    <form onSubmit={(event) => salvar(event)}>
        <div className="mb-3">
          <label className="form-label">Link</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" value={link} onChange={(event) => setLink(event.target.value)}></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Descricao</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Uma completa revolução do audio visual" value={descricao} onChange={(event) => setDescricao(event.target.value)}></input>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Salvar</button>
        </div>
    </form>
      <h3>Lista de links</h3>
      <table className="table">
        <thead>
          <tr>
            <th>link</th>
            <td>Descrição</td>
          </tr>
        </thead>
        
        <tbody>
          {listaLink.map((lista, index) => (
            <tr key={index}>
              <td>{lista.link}</td>
              <td>{lista.descricao}</td>
              <td>
                <button type='button' className="btn btn-primary"
                  onClick={(event) => editar(lista)}>Editar</button>

                <button type='button' className="btn btn-danger"
                  onClick={(event) => excluir(lista)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div></>
  );
}

export default App;