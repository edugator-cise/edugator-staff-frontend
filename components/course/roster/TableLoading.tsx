import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const TableLoading = () => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-slate-50 rounded-t-md">
          <TableRow>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead
                key={i}
                className="px-4 text-xs uppercase text-slate-800 font-dm py-2"
              >
                <Skeleton className="w-20 h-4" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow className="bg-white hover:bg-slate-50" key={i}>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableCell key={i} className="px-4 py-3">
                  <Skeleton
                    style={{
                      width: Math.random() * 100 + 50,
                    }}
                    className="h-4"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoading;
