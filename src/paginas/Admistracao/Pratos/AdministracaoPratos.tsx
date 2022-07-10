import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

export default function AdmnistracaoPratos() {

  const [pratos, setPratos] = useState<IPrato[]>([])


  useEffect(() => {
    http.get<IPrato[]>("pratos/")
      .then(resposta => {
        console.log(resposta)
        setPratos(resposta.data)
      })
  }, [])

  function Excluir(pratoAhSerExcluido: IPrato) {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato =>
          prato.id !== pratoAhSerExcluido.id)
        setPratos([...listaPratos])
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
              Tags
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map(
            prato =>
              <TableRow key={prato.id} >
                <TableCell>
                  {prato.nome}
                </TableCell>

                <TableCell>
                  {prato.tag}
                </TableCell>
                <TableCell>
                  [<a href={prato.imagem} rel="noreferrer" target="_blank">ver imagem</a>]
                </TableCell>
                <TableCell>
                  [<Link to={`/admin/pratos/${prato.id}`}>
                    Editar
                  </Link>]
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => Excluir(prato)}>Excluir</Button>
                </TableCell>
              </TableRow>)}

        </TableBody>
      </Table>
    </TableContainer>
  )
};
