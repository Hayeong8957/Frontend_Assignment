import { css, CSSObject, Interpolation } from 'styled-components';

type DeviceSize = 'small' | 'medium' | 'large';

const breakpoints: Record<DeviceSize, number> = {
  small: 600, // phone
  medium: 768, // tablet
  large: 1200, // desktop
};

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (first: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<any>[]) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceSize, any>;

export { media };
