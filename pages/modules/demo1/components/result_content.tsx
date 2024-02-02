import { FC } from "react";
import { Demo1Result } from "../model/demo1_result";

interface ResultContentProps {
    result: Demo1Result
}

export const ResultContent: FC<ResultContentProps> = ({ result }) => {
    return (
        <>
            <p>{result.klasifikasi}</p>
            <p>{result.labelling}</p>
            <p>{result.kategori}</p>
            <p>{result.sentiment}</p>
        </>
    )
}