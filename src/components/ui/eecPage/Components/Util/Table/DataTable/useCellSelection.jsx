import { createRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";


export const useCellSelection = (rows, columns, table) => {
  const [selectedCell, setSelectedCell] = useState();
  const [selection, setSelection] = useState();
  const [isSelecting, setIsSelecting] = useState(false);
  const cellRefs = useRef({});

  const columnIndexMap = useMemo(() => {
    return columns.reduce((acc, column, index) => {
      acc[column.id] = index;
      return acc;
    }, {});
  }, [columns]);

  const rowIndexMap = useMemo(() => {
    return rows.reduce((acc, row, index) => {
      acc[row.id] = index;
      return acc;
    }, {});
  }, [rows]);

  const getCellRef = (rowId, columnId) => {
    const key = `${rowId}-${columnId}`;
    if (!cellRefs.current[key]) {
      cellRefs.current[key] = createRef();
    }
    return cellRefs.current[key];
  };

  const isCellSelected = useCallback(
    (cellRowId, cellColumnId) => {
      return (
        selectedCell &&
        selectedCell.rowId === cellRowId &&
        selectedCell.columnId === cellColumnId
      );
    },
    [selectedCell]
  );

  const isCellInRange = useCallback(
    (cellRowId, cellColumnId) => {
      if (!selection) return false;

      const rowIndex = rowIndexMap[cellRowId];
      const columnIndex = columnIndexMap[cellColumnId];

      const startRowIndex = rowIndexMap[selection.start.rowId];
      const startColumnIndex = columnIndexMap[selection.start.columnId];
      const endRowIndex = rowIndexMap[selection.end.rowId];
      const endColumnIndex = columnIndexMap[selection.end.columnId];

      const isRowInRange =
        rowIndex >= Math.min(startRowIndex, endRowIndex) &&
        rowIndex <= Math.max(startRowIndex, endRowIndex);
      const isColumnInRange =
        columnIndex >= Math.min(startColumnIndex, endColumnIndex) &&
        columnIndex <= Math.max(startColumnIndex, endColumnIndex);

      return isRowInRange && isColumnInRange;
    },
    [selection, columnIndexMap, rowIndexMap]
  );

  const handleKeyDown = (e,rowId,columnId,) => {
    const { key } = e;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
      e.preventDefault();

      const edgeRowId = selection ? selection.end.rowId : rowId;
      const edgeColumnId = selection ? selection.end.columnId : columnId;

      const rowIndex = rows.findIndex((r) => r.id === edgeRowId);
      const columnIndex = columns.findIndex((c) => c.id === edgeColumnId);

      let nextRowId = edgeRowId;
      let nextColumnId = edgeColumnId;

      switch (key) {
        case "ArrowUp":
          if (rowIndex > 0) {
            nextRowId = rows[rowIndex - 1].id;
          }
          break;
        case "ArrowDown":
          if (rowIndex < rows.length - 1) {
            nextRowId = rows[rowIndex + 1].id;
          }
          break;
        case "ArrowLeft":
          if (columnIndex > 0) {
            nextColumnId = columns[columnIndex - 1].id;
          }
          break;
        case "ArrowRight":
          if (columnIndex < columns.length - 1) {
            nextColumnId = columns[columnIndex + 1].id;
          }
          break;
        default:
          return;
      }

      const nextSelectedCell = { rowId: nextRowId, columnId: nextColumnId };
      if (e.shiftKey && selectedCell) {
        setSelection((prev) => {
          const start = prev?.start || selectedCell;
          return { start, end: nextSelectedCell };
        });
      } else {
        if (!e.shiftKey) {
          setSelectedCell(nextSelectedCell);
          setSelection({
            start: nextSelectedCell,
            end: nextSelectedCell,
          });
        }
      }
    }
  };

  const handleMouseDown = useCallback((rowId, columnId) => {
      setSelectedCell({ rowId, columnId });
      setSelection({
        start: { rowId, columnId },
        end: { rowId, columnId },
      });
      setIsSelecting(true);
    },
    []
  );

  const handleMouseEnter = useCallback((rowId,columnId, table) => {
      if (isSelecting) {
        setSelection((prev) => {
          if (!prev) return null;
          return {
            start: prev.start,
            end: { rowId, columnId },
          };
        });
        table.focusedCell = '-1'
      }
    },
    [isSelecting]
  );

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const handleClick = useCallback((rowId, columnId) => {
    setSelectedCell({
      rowId,
      columnId,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  useLayoutEffect(() => {
    if (selectedCell) {
      const { rowId, columnId } = selectedCell;
      const key = `${rowId}-${columnId}`;
      
      const cellRef = cellRefs.current[key];
      if (cellRef && cellRef.current) {
        cellRef.current.focus();
        table.focusedCell = key;
      }
    }
  }, [selectedCell]);

  return {
    selectedCell,
    selection,
    getCellRef,
    isCellSelected,
    isCellInRange,
    handleClick,
    handleKeyDown,
    handleMouseDown,
    handleMouseEnter,
  };
}

