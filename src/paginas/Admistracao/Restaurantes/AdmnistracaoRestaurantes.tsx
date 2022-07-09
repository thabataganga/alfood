import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

export default function AdmnistracaoRestaurantes() {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])


  useEffect(() => {
    http.get<IRestaurante[]>("restaurantes/")
      .then(resposta => {
        console.log(resposta)
        setRestaurantes(resposta.data)
      })
  }, [])

  function Excluir(restaurateAhSerExcluido: IRestaurante) {
    http.delete(`restaurantes/${restaurateAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurate = restaurantes.filter(restaurante =>
          restaurante.id !== restaurateAhSerExcluido.id)
        setRestaurantes([...listaRestaurate])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(
            restaurante =>
              <TableRow key={restaurante.id} >
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  [<Link to={`/admin/restaurantes/${restaurante.id}`}>
                    Editar
                  </Link>]
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => Excluir(restaurante)}>Excluir</Button>
                </TableCell>
              </TableRow>)}

        </TableBody>
      </Table>
    </TableContainer>
  )
};
