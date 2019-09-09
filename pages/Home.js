import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Breadcrumb,
    Icon
} from 'antd';
import { useRouter } from 'next/router'
import axios from "axios";


const Home = (props) => {
    const router = useRouter()

    useEffect(() => {
        renderhome()
        const { OmiseCard } = window;
        if (typeof OmiseCard === "undefined") {
            console.log('error')
        } else {

            OmiseCard.configure({
                publicKey: 'pkey_test_5h5s8shqg6xxhpgckft',
                amount: 10000
            });

            OmiseCard.configureButton('#checkout-button', {
                frameLabel: 'Merchant name',
                submitLabel: 'PAY RIGHT NOW !',
            });

            OmiseCard.attach();

        }
    })

    const renderhome = () => {
        if ((props.home == router.pathname) && "/") {
            return <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Icon type="home" />
                </Breadcrumb.Item>
            </Breadcrumb>
        }
    }
    const {data} = props
    console.log(data)
    return (
        <React.Fragment>
            {renderhome()}
            <h1>Hello</h1>
            <h1>Next js and PWA and Redux</h1>
            <p>อายุ {props.age} ปี</p>
            <button onClick={props.increteAge}>+ คลิกบวกอายุ</button>
            <button onClick={props.decreteAge}>- คลิกลบอายุ</button>
            <p></p>
            <h1>Omise</h1>
            <p></p>
            <form action="/checkout.php" method="post">
                <input type="submit" value="Pay" id="checkout-button" />
            </form>
            <p></p>
            <div>
                {data.posts.name === "Error" ? <Oops /> : data.posts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <br />
                    </div>
                ))}
            </div>
          
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        home: state.Navbarreducers.Home,
        age: state.countAgereducers.count
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        increteAge: () => {
            dispatch({ type: 'INCREMENT' })
        },
        decreteAge: () => {
            dispatch({ type: 'DECREMENT' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)