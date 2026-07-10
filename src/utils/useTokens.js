import { useColorModeValue } from '@chakra-ui/react';

export const STATUS_COLORS = {
  todo: '#6C7686',
  doing: '#D9B054',
  'in progress': '#D9B054',
  done: '#57C08A',
  cancelled: '#C25E5E',
  canceled: '#C25E5E',
};

export const statusColor = (state) => STATUS_COLORS[`${state}`.toLowerCase()] || STATUS_COLORS.todo;

const light = {
  appBg: '#F6F6F4',
  topbarBg: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: 'rgba(255,255,255,.65)',
  inputBg: '#FFFFFF',
  border: 'rgba(0,0,0,.08)',
  borderStrong: 'rgba(0,0,0,.14)',
  text: '#1A1D23',
  textBody: '#3D4450',
  textMuted: '#5C6470',
  textDim: '#8B93A5',
  accent: '#5F6BE0',
  accentText: '#4A54B8',
  accentSoft: 'rgba(123,135,247,.12)',
  onAccent: '#FFFFFF',
  checkboxBorder: '#C2C8D4',
  dueText: '#9A7B2D',
  dueSoft: 'rgba(217,176,84,.16)',
  dangerText: '#B54747',
  dangerSoft: 'rgba(194,94,94,.12)',
  hoverBg: 'rgba(0,0,0,.04)',
};

const dark = {
  appBg: '#0E1116',
  topbarBg: '#10141B',
  surface: '#161B22',
  surfaceMuted: 'rgba(22,27,34,.6)',
  inputBg: '#0F1319',
  border: 'rgba(255,255,255,.07)',
  borderStrong: 'rgba(255,255,255,.1)',
  text: '#E6E9EF',
  textBody: '#C7CDD8',
  textMuted: '#9AA3B2',
  textDim: '#5C6470',
  accent: '#7B87F7',
  accentText: '#98A2FF',
  accentSoft: 'rgba(123,135,247,.12)',
  onAccent: '#0B0E14',
  checkboxBorder: '#3A4150',
  dueText: '#D9B054',
  dueSoft: 'rgba(217,176,84,.12)',
  dangerText: '#C25E5E',
  dangerSoft: 'rgba(194,94,94,.12)',
  hoverBg: 'rgba(255,255,255,.04)',
};

export const useTokens = () => useColorModeValue(light, dark);

export default useTokens;
