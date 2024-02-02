import Head from 'next/head';
import { Demo1 } from './modules/demo1/demo1';
import { Colors } from './helpers/const_strings';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ flexDirection: 'row', height: '100vh', display: 'flex', gap: 10, margin: -8 }}>
        <div style={{ width: '20vw', height: '100%', paddingLeft: 16 }}>
          <h1 style={{color: Colors.black}}>Jawa Post AI</h1>
          <h3 style={{color: Colors.black}}>Demo 1</h3>
          <h3 style={{color: Colors.black}}>Demo 2</h3>
          <h3 style={{color: Colors.black}}>Demo 3</h3>
        </div>
        <div style={{ width: 1, height: '100%', backgroundColor: Colors.disableLight }} />
        <div style={{ flex: '1', overflowY: 'auto', }}>
          <Demo1 />
        </div>
      </div>
    </>
  );
}
