import { Keyboard, Modal, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import globalStyles, { CloseIcon } from "../global";

const ModalWithClose = ({opened, setOpened, onClose, children}) => {

  return (
    <Modal
      visible={opened}
      animationType='slide'
    >
      <TouchableWithoutFeedback>
        <View style={globalStyles.container}>
          <CloseIcon 
            style={styles.close}
            onPress={() => {
              setOpened(false);
              onClose();
            }} 
          />
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  close: {
    marginTop: 30,
    marginBottom: 10
  },
})

export default ModalWithClose;