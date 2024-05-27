
import './App.css';
import { Segnalazione } from './models/types.model';
import { SubmitHandler, useForm } from 'react-hook-form';
import { create, deleteById, getFilteredList } from './api/api';
import { useEffect, useState } from 'react';


function App() {

  const { register, handleSubmit } = useForm<Segnalazione>()
  const { register: searchRegister, handleSubmit: handleSearchSubmit } = useForm<{ date?: string}>()

  const [searchResponse, setSearchResponse] = useState<Segnalazione[]>([])
  const [deleteResponse, setDeleteResponse] = useState<boolean>(false)
  const [deletedId, setDeletedId] = useState<number>()

  const onSubmit: SubmitHandler<Segnalazione> = (data) => {
    create(data)
  }

  const onSearch: SubmitHandler<{ date?: string }> = async (data) => {
    setSearchResponse(await getFilteredList(data.date))
  }

  const onDelete = (id: number) => {
    deleteById(id)
    setDeletedId(id)
    setDeleteResponse(true)
  }

  useEffect(() => {
    if (deleteResponse) {
      setSearchResponse(searchResponse.filter(s => s.id !== deletedId))
      setDeleteResponse(false)
    }
  }, [deleteResponse])


  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "inline-block", width: "50%", textAlign: "center" }}>
          <h2>Inserisci una segnalazione</h2>
          <form onSubmit={handleSubmit(onSubmit)} >
            <strong>Cliente</strong><br />
            <input placeholder='name' style={{ margin: "1vh" }} {...register("cliente.nome")} />
            <input placeholder='surname' style={{ margin: "1vh" }} {...register("cliente.cognome")} />
            <input placeholder='email' style={{ margin: "1vh" }} {...register("cliente.email")} /><br />
            <strong>Tecnico</strong><br />
            <input placeholder='name' style={{ margin: "1vh" }} {...register("tecnico.nome")} />
            <input placeholder='surname' style={{ margin: "1vh" }} {...register("tecnico.cognome")} /><br />
            <input type='submit' />
          </form>
        </div>
        <div style={{ display: "inline-block", width: "50%", textAlign: "center" }}>
          <h2>Cerca segnalazioni</h2>
          <form onSubmit={handleSearchSubmit(onSearch)} >
            <strong>Per data</strong><br />
            <input style={{ margin: "1vh" }} placeholder='date' type='date'{...searchRegister("date")} /><br />
            <input type='submit' />
          </form>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {searchResponse.map(item => (
          <div key={item.id}>
            <p>{item.cliente.email}</p>
            <p>{item.tecnico.nome} {item.tecnico.cognome}</p>
            <p>{item.dataOra.toString()}</p>
            <button onClick={() => onDelete(item.id ?? 0)}>Elimina</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
