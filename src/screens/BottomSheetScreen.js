import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useMemo, useCallback } from "react";
import { View, Button, StyleSheet, Text, Pressable } from "react-native";

export default function BottomSheetScreen() {
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(1); //50% 위치로 열기
  }, []);

  const handleClose = () => {
    try {
      sheetRef.current?.close();
    } catch (err) {
      console.err("BottomSheet 닫기 실패 : ", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="닫기" onPress={handleClose} /> */}
      <Button title="Bottom Sheet 열기" onPress={openSheet} />

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDismissOnClose={false}
        onClose={() => console.log("📦 BottomSheet 닫힘")}
      >
        <View style={styles.content}>
          <Pressable onPress={handleClose}>
            <Text>닫기</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
