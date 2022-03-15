import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../components/Footer';
import OptionSelectItem from '../../components/OptionSelectItem';

import { makeOptions } from '../../utils/settings';
import { actions as bottomSheetActions } from '../../store/slices/bottomSheet';

import setting from '../../store/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './SettingPopup.module.scss';
import Divider from '../../components/Divider';
import {
  actions as settingActions,
  selectors as settingSelectors,
} from '../../store/slices/setting';

const SettingPopup = () => {
  const [settings, setSettings] = useState(useSelector(settingSelectors.app));
  // console.log('settings:', settings);
  const dispatch = useDispatch();
  const langOptions = makeOptions(setting.language);
  const bgmOptions = makeOptions(setting.bgm);
  const soundEffectOptions = makeOptions(setting['sound-effect']);
  const ladderComplexityOptions = makeOptions(setting['ladder-complexity']);
  const ladderLengthOptions = makeOptions(setting['ladder-length']);
  const ladderDirectionOptions = makeOptions(setting['ladder-direction']);

  const handleSettingChange = (name, option) => {
    // console.log('name:', name, 'option:', option);
    // TODO: if name is 'lang', dispatch action for lang
    let refinedOption = option.id;
    // if (option.id === 'on') {
    //   refinedOption = true;
    // } else if (option.id === 'off') {
    //   refinedOption = false;
    // }
    setSettings({ ...settings, [name]: refinedOption });
  };

  const handleCancel = () => {
    dispatch(bottomSheetActions.close(true));
  };

  const handleSave = () => {
    dispatch(settingActions.appSetting(settings));
    dispatch(bottomSheetActions.close(true));
  };

  // console.log('langOptions:', langOptions);
  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>{i18n.popup.title.setting['en']}</h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='lang'
            title={i18n.popup.option.title.language['en']}
            options={langOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              langOptions.findIndex((item) => item.id === settings.lang)
            )}
          />
        </div>

        <Divider />
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='bgm'
            title={i18n.popup.option.title.bgm['en']}
            options={bgmOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              bgmOptions.findIndex((item) => item.id === settings.bgm)
            )}
          />
          <OptionSelectItem
            name='soundEffect'
            title={i18n.popup.option.title['sound-effect']['en']}
            options={soundEffectOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              soundEffectOptions.findIndex(
                (item) => item.id === settings.soundEffect
              )
            )}
          />
        </div>

        <Divider />
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='ladderComplexity'
            title={i18n.popup.option.title['ladder-complexity']['en']}
            options={ladderComplexityOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              ladderComplexityOptions.findIndex(
                (item) => item.id === settings.ladderComplexity
              )
            )}
          />
          <OptionSelectItem
            name='ladderLength'
            title={i18n.popup.option.title['ladder-length']['en']}
            options={ladderLengthOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              ladderLengthOptions.findIndex(
                (item) => item.id === settings.ladderLength
              )
            )}
          />
          <OptionSelectItem
            name='ladderDirection'
            title={i18n.popup.option.title['ladder-direction']['en']}
            options={ladderDirectionOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              ladderDirectionOptions.findIndex(
                (item) => item.id === settings.ladderDirection
              )
            )}
          />
        </div>
      </div>
      <Footer>
        <button className='outline' onClick={handleCancel}>
          {i18n.popup.button.cancel['en']}
        </button>
        <button className='solid' onClick={handleSave}>
          {i18n.popup.button.save['en']}
        </button>
      </Footer>
    </div>
  );
};

export default SettingPopup;
