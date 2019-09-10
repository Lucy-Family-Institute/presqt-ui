import { useState } from 'react';

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  return {
    modalVisible,
    toggleModalVisibility
  };
};

export default useModal;
