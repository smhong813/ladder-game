import React from 'react';
import { useSelector } from 'react-redux';

import { langSelectors } from '../../store/slices/lang';
import i18n from './i18n.json';
import styles from './Result.module.scss';

const Result = ({ results, colors }) => {
  const lang = useSelector(langSelectors.currentLang);

  return (
    <div className={styles.popup}>
      <h1 className={styles.title}>{i18n.title[lang]}</h1>
      <ul className={styles.list}>
        {results.map((result, index) => (
          <li
            className={styles.item}
            key={`${result.player}-${result.reward}-${index}`}
          >
            <h4 className={styles.player}>{result.player}</h4>
            <p className={styles.reward} style={{ color: colors[index] }}>
              {result.reward}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
