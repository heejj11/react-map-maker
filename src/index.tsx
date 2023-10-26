import React from "react"
import ReactDOM from "react-dom/client"
import "@/index.css"
import "@/assets/style.css"
import App from "@/App"

declare global {
  interface Window {
    naver: any
  }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<App />)
