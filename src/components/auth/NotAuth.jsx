import { Card } from "@tesla/design-system-react";
import React from "react";

export const NotAuth = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
     <h2>Please login to access Tools</h2>
     <h4>Login button on top-right corner</h4>
    </Card>
  );
};
