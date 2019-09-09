import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import {
    Breadcrumb,
    Icon
} from 'antd';
import { useRouter } from 'next/router'

const User = (props) => {
    const router = useRouter()
    useEffect(() => {
        renderuser()
    })

    const renderuser = () => {
        if ((props.about == router.pathname) && "/user") {
            return <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Icon type="user" />
                </Breadcrumb.Item>
            </Breadcrumb>
        }
    }
    return (
        <Layout>
            {renderuser()}
            User
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        about: state.Navbarreducers.User
    };
}

export default connect(mapStateToProps, null)(User)