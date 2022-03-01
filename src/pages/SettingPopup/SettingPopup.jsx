import React from 'react';
import Footer from '../../components/Footer';
import OptionSelectItem from '../../components/OptionSelectItem';

import { makeOptions } from '../../utils/settings';

import setting from '../../stores/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './SettingPopup.module.scss';
import Divider from '../../components/Divider';

const SettingPopup = () => {
  const langOptions = makeOptions(setting.language);
  const bgmOptions = makeOptions(setting.bgm);
  const soundEffectOptions = makeOptions(setting['sound-effect']);
  const ladderComplexityOptions = makeOptions(setting['ladder-complexity']);
  const ladderLengthOptions = makeOptions(setting['ladder-length']);
  const ladderDirectionOptions = makeOptions(setting['ladder-direction']);

  const handleSettingChange = (name, option) => {
    console.log('name:', name, 'option:', option);
  };
  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>{i18n.popup.title.setting['ko']}</h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='language'
            title={i18n.popup.option.title.language['ko']}
            options={langOptions}
            onChange={handleSettingChange}
          />
        </div>

        <Divider />
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='bgm'
            title={i18n.popup.option.title.bgm['ko']}
            options={bgmOptions}
            onChange={handleSettingChange}
          />
          <OptionSelectItem
            name='sound-effect'
            title={i18n.popup.option.title['sound-effect']['ko']}
            options={soundEffectOptions}
            onChange={handleSettingChange}
          />
        </div>

        <Divider />
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='ladder-complexity'
            title={i18n.popup.option.title['ladder-complexity']['ko']}
            options={ladderComplexityOptions}
            onChange={handleSettingChange}
          />
          <OptionSelectItem
            name='ladder-length'
            title={i18n.popup.option.title['ladder-length']['ko']}
            options={ladderLengthOptions}
            onChange={handleSettingChange}
          />
          <OptionSelectItem
            name='ladder-direction'
            title={i18n.popup.option.title['ladder-direction']['ko']}
            options={ladderDirectionOptions}
            onChange={handleSettingChange}
          />
        </div>
      </div>
      <Footer className={styles.footer}>
        <button className='outline'>{i18n.popup.button.cancel['ko']}</button>
        <button className='solid'>{i18n.popup.button.save['ko']}</button>
      </Footer>
    </div>
  );
};

export default SettingPopup;
