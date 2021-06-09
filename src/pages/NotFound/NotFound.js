import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para a página inicial</Link>
    </section>
  );
};

export default NotFound;
