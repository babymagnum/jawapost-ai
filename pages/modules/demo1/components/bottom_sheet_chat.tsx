// import { FC, useCallback, useMemo } from "react";

// interface BottomSheetChatProps {
//     bottomSheetRef: React.RefObject<BottomSheet>
// }

// export const BottomSheetChat: FC<BottomSheetChatProps> = ({ bottomSheetRef }) => {

//     const snapPoints = useMemo(() => ['1', '40'], []);

//     const handleSheetChanges = useCallback((index: number) => {
//         console.log('handleSheetChanges', index);
//     }, []);

//     return (
//         <BottomSheet
//             enablePanDownToClose={true}
//             ref={bottomSheetRef}
//             index={-1}
//             snapPoints={snapPoints}
//             onChange={handleSheetChanges}>
//             <Text>Testing bottomsheet</Text>
//         </BottomSheet>
//     )
// }