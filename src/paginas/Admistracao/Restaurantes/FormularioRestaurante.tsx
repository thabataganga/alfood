import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function FormularioRestaurante() {

  const [nomeRestaurante, setNomeRestaurante] = useState("")

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    axios.post("http://localhost:8000/api/v2/restaurantes/", {
      nome: nomeRestaurante
    })
      .then(() => {
        alert("Restaurante cadastrado com sucesso!")
      })
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        id="nome-restaurante"
        label="Nome do Restaurante"
        variant="standard"
        value={nomeRestaurante}
        onChange={evento => setNomeRestaurante(evento.target.value)}
      />
      <Button type="submit" variant="outlined">Outlined</Button>
    </form>
  )
};
