import Layout from "../components/Layout";

export default function Home() {
  return (
      <Layout>
           <ol>
             <li>Create a <a href="/account/register/">profile</a></li>
             <li>Create some <a href="/doc/create/">documents</a></li>
             <li>Find your <a href="/doc/">documents</a> & download in word or pdf format</li>
           </ol>
      </Layout>
  )
}

