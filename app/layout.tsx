"use client";
import "./assets/globals.scss";
import { Provider } from "react-redux";
import store from "./store/store";

export const metadata = {
  title: "Travel planner",
  description: "Basic IA travel planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <title>Travel planner</title>
      <link rel="icon" type="image/icon" href="/favicon.ico" />
      <html lang="es">
        <body>{children}</body>
      </html>
    </Provider>
  );
}

