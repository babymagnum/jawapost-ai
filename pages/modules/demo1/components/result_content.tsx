import { FC } from "react";
import { Demo1Result } from "../model/demo1_result";

interface ResultContentProps {
    result: Demo1Result
}

export const ResultContent: FC<ResultContentProps> = ({ result }) => {
    return (
        <>
            <p style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{result.klasifikasi}</p>
        </>
    )
}