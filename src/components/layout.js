import React from "react";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <main className="main__layout">
        <div className="header__layout">
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <Item>Icon</Item>
            </Grid>
            <Grid item xs={2}>
                <Item>mono</Item>
            </Grid>
            <Grid item xs={2}>
                <Item>LUANTARSO</Item>
            </Grid>
            <Grid item xs={2}>
                <Item>LIVROS</Item>
            </Grid>
            <Grid item xs={2}>
                <Item>Searchbox</Item>
            </Grid>
            <Grid item xs={2}>
                <Item>+ livro</Item>
            </Grid>
        </Grid>
        </div>
        <div className="page__content">
            {children}
        </div>
    </main>
  );
}