import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../components/Footer';
import OptionSelectItem from '../../components/OptionSelectItem';

import { makeOptions } from '../../utils/settings';
import { actions as bottomSheetActions } from '../../store/slices/bottomSheet';
import { actions as langActions, langSelectors } from '../../store/slices/lang';

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
  const lang = useSelector(langSelectors.currentLang);

  const dispatch = useDispatch();
  const langOptions = makeOptions(setting.language, lang);
  const bgmOptions = makeOptions(setting.bgm, lang);
  const soundEffectOptions = makeOptions(setting['sound-effect'], lang);
  const ladderComplexityOptions = makeOptions(
    setting['ladder-complexity'],
    lang
  );
  const ladderLengthOptions = makeOptions(setting['ladder-length'], lang);
  const ladderDirectionOptions = makeOptions(setting['ladder-direction'], lang);

  const handleSettingChange = (name, option) => {
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
    dispatch(langActions.set(settings.lang));
  };

  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>{i18n.popup.title.setting[lang]}</h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='lang'
            title={i18n.popup.option.title.language[lang]}
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
            title={i18n.popup.option.title.bgm[lang]}
            options={bgmOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              bgmOptions.findIndex((item) => item.id === settings.bgm)
            )}
            disabled={true}
          />
          <OptionSelectItem
            name='soundEffect'
            title={i18n.popup.option.title['sound-effect'][lang]}
            options={soundEffectOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              soundEffectOptions.findIndex(
                (item) => item.id === settings.soundEffect
              )
            )}
            disabled={true}
          />
        </div>

        <Divider />
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='ladderComplexity'
            title={i18n.popup.option.title['ladder-complexity'][lang]}
            options={ladderComplexityOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              ladderComplexityOptions.findIndex(
                (item) => item.id === settings.ladderComplexity
              )
            )}
            disabled={true}
          />
          <OptionSelectItem
            name='ladderLength'
            title={i18n.popup.option.title['ladder-length'][lang]}
            options={ladderLengthOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              ladderLengthOptions.findIndex(
                (item) => item.id === settings.ladderLength
              )
            )}
            disabled={true}
          />
          <OptionSelectItem
            name='ladderDirection'
            title={i18n.popup.option.title['ladder-direction'][lang]}
            options={ladderDirectionOptions}
            onChange={handleSettingChange}
            initialIndex={Math.max(
              0,
              ladderDirectionOptions.findIndex(
                (item) => item.id === settings.ladderDirection
              )
            )}
            disabled={true}
          />
        </div>
      </div>
      <Footer>
        <button className='outline' onClick={handleCancel}>
          {i18n.popup.button.cancel[lang]}
        </button>
        <button className='solid' onClick={handleSave}>
          {i18n.popup.button.save[lang]}
        </button>
      </Footer>
    </div>
  );
};

export default SettingPopup;
