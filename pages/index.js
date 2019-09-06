import axios from "axios";
import Oops from '../components/Oops';
import Head from 'next/head';

const Index = (props) => {

    return (

        <React.Fragment>
             <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="An example PWA" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#302ecd" />
          <title>BlChamp</title>
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" href="/static/favicon.ico" />
        </Head>
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