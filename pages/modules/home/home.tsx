import { useState } from "react";
import { Colors } from "../../helpers/const_strings";
import Demo1 from "../demo1/demo1";
import Demo2 from "../demo2/demo2";
import Demo3 from "../demo3/demo3";
import Demo4 from "../demo4/demo4";
import { HomeMenu } from "./components/home_menu";
import Head from "next/head";
import { useHomeStore } from "./home_store";

export const Home = () => {
    const index = useHomeStore(state => state.index)
    const setIndex = useHomeStore(state => state.setIndex)

    return (
        <>
            <Head>
                <title>Jawa Post AI</title>
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
                    <HomeMenu
                        selected={index === 3} content={'Demo 4'}
                        onDivClick={() => setIndex(3)}
                    />
                </div>
                <div style={{ width: 1, height: '100%', backgroundColor: Colors.disableLight }} />
                {
                    [
                        <Demo1 />,
                        <Demo2 />,
                        <Demo3 />,
                        <Demo4 />,
                    ][index]
                }
            </div>
        </>
    );
}