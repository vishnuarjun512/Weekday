import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import React from "react";
import PaginationComponent from "../Pagination/PaginationComponent";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { Status?: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  const exportToExcel = () => {
    // Create a mapping from status number to status string
    const statusMap: Record<number, { label: string; color: string }> = {
      0: { label: "Not Responded", color: "bg-red-400" },
      1: { label: "Responded", color: "bg-orange-400" },
      2: { label: "Scheduled", color: "bg-blue-500" },
      3: { label: "Declined", color: "bg-red-600" },
      4: { label: "1st Interview Done", color: "bg-green-300" },
      5: { label: "2nd Interview Done", color: "bg-green-400" },
      6: { label: "3rd Interview Done", color: "bg-green-500" },
      7: { label: "Waiting for Company Result", color: "bg-yellow-300" },
      8: { label: "Not Selected", color: "bg-red-700" },
      9: { label: "Selected", color: "bg-green-600" },
    };

    // Format the data
    const resultDataToExcelFormat = data.map((candidate) => {
      const statusLabel =
        candidate.Status !== undefined
          ? statusMap[candidate.Status]?.label || "Unknown"
          : "Unknown"; // Default to 'Unknown'

      return {
        ...candidate,
        Status: statusLabel, // Replace the status number with the status label
      };
    });

    // Split the data into two sheets
    const ramData = resultDataToExcelFormat.slice(
      0,
      resultDataToExcelFormat.length / 2
    ); // First half for Ram
    const shyamData = resultDataToExcelFormat.slice(
      resultDataToExcelFormat.length / 2
    ); // Second half for Shyam

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert data to worksheets
    const ramSheet = XLSX.utils.json_to_sheet(ramData);
    const shyamSheet = XLSX.utils.json_to_sheet(shyamData);

    // Append the sheets to the workbook
    XLSX.utils.book_append_sheet(wb, ramSheet, "Ram");
    XLSX.utils.book_append_sheet(wb, shyamSheet, "Shyam");

    // Generate a binary string
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Save the file using file-saver
    saveAs(blob, "candidatesResult.xlsx");
  };

  return (
    <div className="p-1">
      <div className="px-3 flex items-center justify-between py-4">
        <div className="text-white"></div>
        <div className="flex justify-center items-center gap-4">
          <Button className="" onClick={exportToExcel}>
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
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
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-xl border">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-center" key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="text-center text-gray-200"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationComponent />
      {/* <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
