import axios from "axios";
import Oops from '../components/Oops';
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Offline, Online } from "react-detect-offline";
import { connect } from 'react-redux'
import $ from "jquery";

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

        $('body').find('#closenoti-online').click(() => {
            $('body').find('.noti').fadeOut("slow");
        })

        $('body').find('#closenoti-offline').click(() => {
            $('body').find('.noti').fadeOut("slow");
        })
        const { OmiseCard } = window;
        OmiseCard.configure({
            publicKey: 'pkey_test_5h5s8shqg6xxhpgckft',
            amount: 10000
        });

        OmiseCard.configureButton('#checkout-button', {
            frameLabel: 'Merchant name',
            submitLabel: 'PAY RIGHT NOW !',
        });

        OmiseCard.attach();
    })

    const reloadnoti = () => {
        var el = document.getElementById('closenoti-online');
        if (el) {
            location.reload(true);
        }

    }
    return (

        <Layout>
            <h1>Next js and PWA and Redux</h1>
            <p>อายุ {props.age} ปี</p>
            <button onClick={props.increteAge}>+ คลิกบวกอายุ</button>
            <button onClick={props.decreteAge}>- คลิกลบอายุ</button>
            <p></p>
            <p>Notifications Online and Ofline</p>
            <p></p>
            <Online onChange={() => {
                reloadnoti()
            }}>
                <p></p>
                <div className="bd-example noti">
                    <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div style={{ width: "30%" }} className="toast-header">
                            <svg className="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect fill="#007aff" width="100%" height="100%"></rect></svg>
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span id="closenoti-online" aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            You Online
                        </div>
                    </div>
                </div>
                <p></p>
            </Online>
            <Offline onChange={() => {
                reloadnoti()
            }}>
                <p></p>
                <div className="bd-example noti">
                    <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div style={{ width: "30%" }} className="toast-header">
                            <svg className="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect fill="#007aff" width="100%" height="100%"></rect></svg>
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span id="closenoti-offline" aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            You offline
                        </div>
                    </div>
                </div>
                <p></p>
                {() => {
                    window.location.reload();
                }}
            </Offline>
            <p></p>
            <h1>Omise</h1>
            <p></p>
            <form action="/checkout.php" method="post">
                <input type="submit" value="Pay" id="checkout-button"/>
            </form>
            <p></p>
            <div>
                {props.posts.name === "Error" ? <Oops /> : props.posts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <br />
                    </div>
                ))}
            </div>
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

const mapStateToProps = (state) => {
    return {
        age: state.countAge.count
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)