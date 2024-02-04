import Head from 'next/head';
import { Colors } from './helpers/const_strings';
import { FC, useMemo, useState } from 'react';
import MemoDemo1 from './modules/demo1/demo1';
import MemoDemo2 from './modules/demo2/demo2';
import MemoDemo3 from './modules/demo3/demo3';

export default function Home() {
  const [index, setIndex] = useState(0)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ flexDirection: 'row', height: '100vh', display: 'flex', margin: -8 }}>
        <div style={{ width: '20vw', height: '100%' }}>
          <h1 style={{ color: Colors.black, marginInline: 10 }}>Jawa Post AI</h1>
          <HomeMenu
            selected={index === 0} content={'Demo 1'}
            onDivClick={() => setIndex(0)}
          />
          <HomeMenu
            selected={index === 1} content={'Demo 2'}
            onDivClick={() => setIndex(1)}
          />
          <HomeMenu
            selected={index === 2} content={'Demo 3'}
            onDivClick={() => setIndex(2)}
          />
        </div>
        <div style={{ width: 1, height: '100%', backgroundColor: Colors.disableLight }} />
        {
            [
              <MemoDemo1 />,
              <MemoDemo2 />,
              <MemoDemo3 />
            ][index]
          }
      </div>
    </>
  );
}

interface HomeMenuProps {
  selected: boolean
  content: string
  onDivClick: () => void
}

const HomeMenu: FC<HomeMenuProps> = ({ selected, content, onDivClick }) => {
  return (
    <div onClick={onDivClick} style={{ backgroundColor: selected ? Colors.genoa : 'transparent', paddingBlock: 10, paddingInline: 10 }}>
      <span style={{ fontSize: 20, fontWeight: 'bold', color: selected ? Colors.white : Colors.black }}>{content}</span>
    </div>
  )
}