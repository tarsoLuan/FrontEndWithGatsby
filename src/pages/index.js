import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../components/layout"

const IndexPage = () => {
  const [data, setData, token] = useState({});

  useEffect(() => {

    axios.get('http://192.168.0.105:8080/api/data')
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
