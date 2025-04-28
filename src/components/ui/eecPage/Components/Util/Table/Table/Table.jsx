import React, { forwardRef } from "react";
import { clsx } from "clsx";
import "./styles.css";

const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="qz__table-wrapper">
    <table ref={ref} className={clsx("qz__table", className)} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={clsx("qz__table__header", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={clsx("qz__table__body", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={clsx("qz__table__footer", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={clsx("qz__table__row", "qz__table__row--hover", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = forwardRef(({ className, ...props }, ref) => (
  <th ref={ref} className={clsx("qz__table__head", className)} {...props} />
));
TableHead.displayName = "TableHead";

const TableData = forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={clsx("qz__table__data", className)} {...props} />
));
TableData.displayName = "TableData";

const TableCaption = forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={clsx("qz__table__caption", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Data = TableData;
Table.Caption = TableCaption;

export default Table;