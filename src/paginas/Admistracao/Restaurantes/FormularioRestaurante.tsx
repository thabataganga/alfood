import { AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => (setNomeRestaurante(resposta.data.nome)))
    }
  }, [parametros])


  const [nomeRestaurante, setNomeRestaurante] = useState("")

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante atualizado com sucesso!")
        })
    } else {
      http.post("restaurantes/", {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!")
        })
    }

  }

  return (
    <>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Admnistração</Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>
                  Novo Restaurante
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
              <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
              <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                  id="nome-restaurante"
                  label="Nome do Restaurante"
                  variant="standard"
                  value={nomeRestaurante}
                  onChange={evento => setNomeRestaurante(evento.target.value)}
                  fullWidth
                  required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>


    </>


  )
};
