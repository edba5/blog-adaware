import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Síguenos en Instagram {' '}
      <a href="https://instagram.com/contpaqi/">@adawaremx</a>
    </h2>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} Todos los derechos reservados.
        </span>
      </div>
    </footer>
  </div>
)
