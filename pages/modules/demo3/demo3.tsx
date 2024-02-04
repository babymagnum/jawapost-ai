import { FC, memo } from "react";

interface Demo3Props { }

const Demo3: FC<Demo3Props> = () => {
    return (
        <div style={{ flex: 1, paddingLeft: '15vw', overflowY: 'auto', overflowX: 'hidden', paddingRight: '15vw', marginTop: '5vh' }}>
            <h1>Demo 3</h1>
        </div>
    )
}

export default memo(Demo3)