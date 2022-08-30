import React, { FC } from 'react';
import styles from './DropdownComponent.module.scss';

interface DropdownComponentProps {}

const DropdownComponent: FC<DropdownComponentProps> = () => (
  <div className={styles.DropdownComponent}>
    DropdownComponent Component
  </div>
);

export default DropdownComponent;
