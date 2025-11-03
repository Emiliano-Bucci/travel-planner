import { iconMapping } from '@/icon-mapping';
import type { ComponentProps } from 'react';

export type IconMapping = keyof typeof iconMapping;

export type Props = {
  type: IconMapping;
  size?: number; // Add size prop
} & Omit<ComponentProps<'svg'>, 'ref'>;

export function Icon({ type, size = 24, ...rest }: Props) {
  const LazyIcon = iconMapping[type];
  return <LazyIcon width={size} height={size} {...rest} />;
}
