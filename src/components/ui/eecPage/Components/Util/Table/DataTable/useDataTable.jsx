import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useHistoryState } from "./useHistoryState";
import { parsePasteData } from "./parsePasteData";
import { useCallback, useEffect, useState } from "react";

export const useDataTable=({
  columns,
  data: initialData,
  history = false,
  maxHistorySize,
  ...props
})=>{
  const [data, setData] = useState(initialData);
  const { presentState, setPresent, undo, redo, clear, canUndo, canRedo } = useHistoryState(initialData, maxHistorySize);

  const handleSetData = useCallback((newData) => {
      setData(prevData => {
        const updatedData = newData instanceof Function ? newData(prevData) : newData;
        if (history) {
          setPresent(updatedData);
        }
        return updatedData;
      });
    },
    [history, setPresent]
  );

  const updateCellData = useCallback((rowIndex,columnId, value) => {
      handleSetData(old =>
        old.map((row, index) =>
          index === rowIndex ? { ...row, [columnId]: value } : row
        )
      );
    },
    [handleSetData]
  );

  const table = useReactTable({
    data: history && presentState ? presentState : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { updateCellData },
    ...props
  });

  const handleTablePaste = useCallback(
    (selectedCell, clipboardData) => {
      if (!clipboardData) return;

      handleSetData(oldData => {
        const parsedData = parsePasteData(clipboardData);
        const newData = oldData.map(row => ({ ...row }));

        const rows = table.getRowModel().rows;
        const columns = table.getVisibleFlatColumns();
        const startRowIndex = rows.findIndex(
          row => row.id === selectedCell.rowId
        );
        const startColIndex = columns.findIndex(
          col => col.id === selectedCell.columnId
        );

        parsedData.forEach((row, rowIndex) => {
          const targetRowIndex = startRowIndex + rowIndex;
          if (targetRowIndex >= rows.length) return;

          row.forEach((newValue, colIndex) => {
            const targetColIndex = startColIndex + colIndex;
            if (targetColIndex < columns.length) {
              const columnId = columns[targetColIndex].id;
              if (newData[targetRowIndex][columnId] !== newValue) {
                (newData[targetRowIndex])[columnId] =
                  newValue;
              }
            }
          });
        });

        return newData;
      });
    },
    [table, handleSetData]
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (history && presentState) {
      setData(presentState);
    }
  }, [presentState, history]);

  return {
    table,
    paste: handleTablePaste,
    undo,
    redo,
    clear,
    canUndo,
    canRedo
  };
}