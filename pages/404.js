export default function Custom404() {
    return <h1>404 - Page Not Found</h1>
  }

export async function getStaticProps(context) {

    return {
        redirect: {
          destination: 'https://genshindb.net/',
          permanent: false,
        },
    }

}