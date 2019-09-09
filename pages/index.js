import axios from "axios";
import Oops from '../components/Oops';
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Home from "./Home"

const Index = (props) => {


    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).then(function (registration) {
                    //console.log('SW registered: ', registration)
                }).catch(function (registrationError) {
                    //console.log('SW registration failed: ', registrationError)
                })
            })
        }

    })

    return (
        <Layout>
            <Home data={props} />
        </Layout>
    )

}

Index.getInitialProps = async () => {
    let datapost = null;
    try {
        //get Stickers
        const response = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        })
        if (response && response.data && typeof response.data !== 'undefined') {
            datapost = response.data
        }
    } catch (error) {
        datapost = error
    }

    return {
        posts: datapost
    }
}

export default Index