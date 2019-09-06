import axios from "axios";
import Oops from '../components/Oops';

const Index = (props) => {

    return (

        <React.Fragment>
            <h1>Batman TV Shows</h1>
            <div>
                {props.posts.name === "Error" ? <Oops /> : props.posts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <br />
                    </div>
                ))}
            </div>
        </React.Fragment>

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