import { CSSProperties, FC } from "react"
import { Colors } from "../helpers/const_strings"

interface CustomDivProps {
    children: React.ReactNode
    useShadow?: boolean
    borderRadius?: number
    backgroundColor?: string
    paddingHorizontal?: number
    paddingVertical?: number
    style?: CSSProperties | undefined
}

export const CustomDiv: FC<CustomDivProps> = ({ children, useShadow = true, borderRadius = 6, backgroundColor = Colors.white, style, paddingHorizontal, paddingVertical }) => {
    return (
        <div style={{ ...style, borderRadius: borderRadius, paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal, paddingTop: paddingVertical, paddingBottom: paddingVertical, backgroundColor: backgroundColor, boxShadow: useShadow ? '0px 3px 8px 0px #0000001A' : '' }}>
            {children}
        </div>
    )
}