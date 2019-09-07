import axios from "axios";
import Oops from '../components/Oops';
import Layout from "../components/Layout";
import {connect} from 'react-redux'

const Index = (props) => {

    return (

        <Layout>
            <h1>Next js and PWA and Redux</h1>
            <p>อายุ {props.age} ปี</p>
            <button onClick={props.increteAge}>+ คลิกบวกอายุ</button>
            <button onClick={props.decreteAge}>- คลิกลบอายุ</button>
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
        age:state.countAge.count
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
            increteAge: () => {
                dispatch({type:'INCREMENT'})
            },
            decreteAge:() => {
                dispatch({type:'DECREMENT'})
            }
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)