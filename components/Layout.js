import React, { Component } from 'react'
import Head from 'next/head';
import Header from './Header/Header'
import 'bootstrap/dist/css/bootstrap.css';

const Layout = (props) => {
    
    return (
        <React.Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="description" content="Bl Champ" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#302ecd" />
                <title>Bl Champ</title>
                <link rel="manifest" href="/_next/static/manifest.json" />
                <link rel="icon" href="/static/favicon.ico" />
                <link rel="stylesheet" href="/_next/static/style.css" />
                <script src="https://cdn.omise.co/omise.js"></script>
            </Head>
            <Header />
           
            <div className="container justify-content-between heightcon">
                {props.children}
            </div>
        </React.Fragment>
    )

}

export default Layout;