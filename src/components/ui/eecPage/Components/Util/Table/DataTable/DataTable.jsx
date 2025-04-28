import { clsx } from "clsx";
import { flexRender } from "@tanstack/react-table";
import { Table } from "../Table";
import { useCellSelection } from "./useCellSelection";
import { useCopyToClipboard } from "./useCopyToClipBoard";
import { parseCopyData } from "./parseCopyData";
import "./styles.css";
import { useEffect, useMemo } from "react";

export const DataTable = ({
  table,
  allowCellSelection = false,
  allowRangeSelection = false,
  allowHistory = false,
  allowPaste = false,
  paste,
  undo,
  redo,
})=>{
  const rows = useMemo(() => table.getRowModel().rows, [table]);
  const columns = table.getVisibleFlatColumns();
  const {
    selectedCell,
    selection: selectedRange,
    getCellRef,
    isCellSelected,
    isCellInRange,
    handleClick,
    handleKeyDown,
    handleMouseDown,
    handleMouseEnter,
  } = useCellSelection(rows, columns, table);
  const [, copy] = useCopyToClipboard();

  useEffect(() => {
    const handleCopy = async (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "c" &&
        selectedRange
      ) {
        event.preventDefault();

        const clipboardData = parseCopyData(
          selectedRange,
          table.getRowModel().rows,
          table.getAllColumns()
        );

        // TODO: it would be great to display a toast with success or error onCopy.
        // The copy function returns a success or error boolean.
        await copy(clipboardData);
      }
    };

    document.addEventListener("keydown", handleCopy);
    return () => document.removeEventListener("keydown", handleCopy);
  }, [selectedRange, copy]);

  useEffect(() => {
    if (allowPaste && paste && selectedCell) {
      const pasteHandler = (event) => {
        const clipboardData = event.clipboardData?.getData("Text");
        paste(selectedCell, clipboardData);
      };

      document.addEventListener("paste", pasteHandler);
      return () => document.removeEventListener("paste", pasteHandler);
    }
  }, [allowPaste, selectedCell, paste]);

  useEffect(() => {
    if (allowHistory && undo && redo) {
      const handleTableKeyDown = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "z") {
          event.preventDefault();
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
      };

      document.addEventListener("keydown", handleTableKeyDown);
      return () => document.removeEventListener("keydown", handleTableKeyDown);
    }
  }, [allowHistory, undo, redo]);

  return (
    <div
      className={clsx("qz__data-table", {
        "qz__data-table--no-select": allowRangeSelection,
      })}
    >
      <Table>
        <Table.Header>
          {table?.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Head>
                );
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {rows?.length ? (
            rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const cellRef = getCellRef(cell.row.id, cell.column.id);
                  const isSelected = isCellSelected(
                    cell.row.id,
                    cell.column.id
                  );
                  const isInRange = isCellInRange(cell.row.id, cell.column.id);
                  const isEditable = cell.column.columnDef.meta?.editable;

                  return (
                    <Table.Data
                      key={cell.id}
                      ref={cellRef}
                      tabIndex={0}
                      onClick={() =>
                        allowCellSelection &&
                        handleClick(cell.row.id, cell.column.id)
                      }
                      onKeyDown={(e) => {
                        allowCellSelection &&
                          handleKeyDown(e, cell.row.id, cell.column.id);
                        if (e.key === "Enter") {
                          // Tricky way to allow triggering of edit mode on Enter press
                          // Call the child's handleKeyDownOnView method directly
                          const editableCell = cellRef.current?.querySelector(
                            ".qz__data-table__editable-cell--viewing"
                          );
                          if (editableCell) {
                            const event = new KeyboardEvent("keydown", {
                              key: "Enter",
                              bubbles: true,
                              cancelable: true,
                            });

                            editableCell.dispatchEvent(event);
                          }
                        }
                      }}
                      onMouseDown={() =>
                        allowRangeSelection &&
                        handleMouseDown(cell.row.id, cell.column.id)
                      }
                      onMouseEnter={() =>
                        allowRangeSelection &&
                        handleMouseEnter(cell.row.id, cell.column.id, table)
                      }
                      data-row-id={cell.row.id}
                      data-column-id={cell.column.id}
                      className={clsx({
                        "qz__data-table__cell--selected": isSelected,
                        "qz__data-table__cell--range": !isSelected && isInRange,
                        "qz__data-table__cell--editable": isEditable,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Data>
                  );
                })}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Data
                colSpan={columns.length}
                className="qz__no-data-message"
              >
                No data.
              </Table.Data>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
