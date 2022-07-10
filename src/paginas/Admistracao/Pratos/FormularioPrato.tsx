import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function FormularioPrato() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => (setNomePrato(resposta.data.nome)))
    }
  }, [parametros])


  const [nomePrato, setNomePrato] = useState("")

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`pratos/${parametros.id}/`, {
        nome: nomePrato
      })
        .then(() => {
          alert("Prato atualizado com sucesso!")
        })
    } else {
      http.post("pratos/", {
        nome: nomePrato
      })
        .then(() => {
          alert("Prato cadastrado com sucesso!")
        })
    }

  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de pratos</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          id="nome-restaurante"
          label="Nome do Prato"
          variant="standard"
          value={nomePrato}
          onChange={evento => setNomePrato(evento.target.value)}
          fullWidth
          required
        />
        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
      </Box>
    </Box>
  )
};
