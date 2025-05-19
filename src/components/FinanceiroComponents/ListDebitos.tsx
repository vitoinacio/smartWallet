"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Loading from "../Loading"
import { DataInfoDebitoType } from "@/types/DebitosTypes"
import { formatarDate } from "@/utils/formatedDate"
import { LucideBanknote, Edit, Trash2 } from "lucide-react" // Importando os ícones
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

interface ListDebitosProps {
  debitosList: DataInfoDebitoType[] | undefined
  isLoading: boolean
  deleteDebito: (id: number) => void
}

const columns: ColumnDef<DataInfoDebitoType>[] = [
  {
    accessorKey: "identificacao",
    header: "Identificação",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("identificacao")}</div>
    ),
    enableSorting: false, // desabilita ordenação aqui
  },
  {
    accessorKey: "observacao",
    header: "Observação",
    cell: ({ row }) => (
      <div
        className="text-muted-foreground truncate max-w-[150px]"
        title={row.getValue("observacao")} // Exibe o texto completo ao passar o mouse
      >
        {row.getValue("observacao")}
      </div>
    ),
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => <div>R$ {row.getValue("valor")}</div>,
  },
  {
    accessorKey: "datavenc",
    header: "Vencimento",
    cell: ({ row }) => <div>{formatarDate(row.getValue("datavenc"))}</div>,
  },
  {
    accessorKey: "notificacao",
    header: "Notificação",
    cell: ({ row }) => (
      <div className="text-center">{row.original.notificacao ? "Sim" : "Não"}</div>
    ),
  },
  {
    accessorKey: "pago",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pago
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.pago ? "Sim" : "Não"}</div>,
  },
]

const ListDebitos = ({ debitosList, isLoading, deleteDebito }: ListDebitosProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: debitosList || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const handleDelete = (id: number) => {
    // Aqui você chama a função `deleteDebito` para excluir o débito
    deleteDebito(id);
  }

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <Loading message="Buscando débitos..." />
        ) : debitosList && debitosList.length > 0 ? (
          <>
            <div className="flex items-center py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Colunas <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                        {/* Coluna de ações */}
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button className="w-8 bg-green-700">
                              <LucideBanknote />
                            </Button>
                            <Button className="w-8 bg-blue-800">
                              <Edit />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button className="w-8 bg-red-700">
                                  <Trash2 />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir este débito? Essa ação não
                                    poderá ser desfeita e removerá permanentemente os dados
                                    relacionados.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(row.original.id_deb)} 
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        Nenhum resultado encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center py-6">Nenhum débito adicionado!</p>
        )}
      </CardContent>
    </Card>
  )
}

export default ListDebitos


