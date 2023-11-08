import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../components/layout"

const IndexPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('https://8080-cs-09125b9c-5d84-4a83-b6c4-2c4da658958c.cs-us-east1-vpcf.cloudshell.dev/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados');
        console.error(error);
      });
  }, []);

  return (
    <Layout>
      <h1>Olá Mundo Gatsby</h1>
      <div>
        <p>Esse é o primeiro parágrafo</p>
        <p>Esse é o segundo parágrafo</p>
        <h1>{data.message}</h1>
        <p>Timestamp: {data.timestamp}</p>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Início</title>
