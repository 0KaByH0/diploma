import { CIcon, JAVAIcon, JSIcon } from '../../main/components/Icons/Lang.icons';
import { Languages } from '../types/app.types';

export const getIcon = (lang: Languages) => {
  return lang === Languages.C ? <CIcon /> : lang === Languages.JAVA ? <JAVAIcon /> : <JSIcon />;
};
