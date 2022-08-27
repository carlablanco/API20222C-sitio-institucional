import React, { FC } from 'react';
import styles from './ModalComponent.module.scss';

interface ModalComponentProps {}

const ModalComponent: FC<ModalComponentProps> = () => (
  <div className={styles.ModalComponent}>
    ModalComponent Component
  </div>
);

export default ModalComponent;
