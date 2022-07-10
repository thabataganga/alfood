import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITags";

export default function FormularioPrato() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => (
          setNomePrato(resposta.data.nome),
          setDescricaoPrato(resposta.data.descricao),
          setTag(resposta.data.tag)
        ))
    }
  }, [parametros])


  const [nomePrato, setNomePrato] = useState("")
  const [descricaoPrato, setDescricaoPrato] = useState("")
  const [tag, setTag] = useState("")
  const [restaurante, setRestaurante] = useState("")

  const [imagem, setImagem] = useState<File | null>(null)

  const [tags, setTags] = useState<ITag[]>([])
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }


  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricaoPrato)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: "pratos/",
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => alert('Prato cadastrado com sucesso'))
      .catch(erro => console.log(erro))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de pratos</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          id="nome"
          label="Nome do Prato"
          variant="standard"
          value={nomePrato}
          onChange={evento => setNomePrato(evento.target.value)}
          fullWidth
          required
          margin="dense"
        />

        <TextField
          id="descricao"
          label="Descrição do Prato"
          variant="standard"
          multiline
          maxRows={4}
          value={descricaoPrato}
          onChange={evento => setDescricaoPrato(evento.target.value)}
          fullWidth
          required
          margin="dense"

        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
            {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
              {tag.value}
            </MenuItem>)}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
              {restaurante.nome}
            </MenuItem>)}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
      </Box>
    </Box>
  )
};
