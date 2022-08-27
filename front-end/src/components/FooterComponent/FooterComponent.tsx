import React, { FC } from 'react';
import styles from './FooterComponent.module.scss';

interface FooterComponentProps {}

const FooterComponent: FC<FooterComponentProps> = () => (
  <div className={styles.FooterComponent}>
    FooterComponent Component
  </div>
);

export default FooterComponent;
