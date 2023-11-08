import * as React from "react"
import Layout from "../components/layout"

const IndexPage = () => {
  return (
    <Layout>
      <h1>Olá Mundo Gatsby</h1>
      <div>
        <p>Esse é o primeiro parágrafo</p>
        <p>Esse é o segundo parágrafo</p>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Início</title>
