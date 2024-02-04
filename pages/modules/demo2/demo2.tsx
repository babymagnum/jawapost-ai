import { FC, memo } from "react";

interface Demo2Props { }

const Demo2: FC<Demo2Props> = () => {
    return (
        <div style={{ flex: 1, paddingLeft: '15vw', overflowX: 'hidden', overflowY: 'auto', paddingRight: '15vw', marginTop: '5vh' }}>
            <h1>Demo 2</h1>
        </div>
    )
}

export default memo(Demo2)