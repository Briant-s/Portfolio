import {
  IconBook,
  IconBrandGithub,
  IconBrandSpotify,
  IconBriefcase,
  IconBulb,
  IconCode,
  IconHeart,
  IconKeyboard,
  IconSchool,
  IconUser,
  type IconProps,
} from '@tabler/icons-react';
import type { ComponentType } from 'react';
import type { AboutIconName } from '../content';

export const aboutIconMap: Record<AboutIconName, ComponentType<IconProps>> = {
  user: IconUser,
  code: IconCode,
  school: IconSchool,
  briefcase: IconBriefcase,
  heart: IconHeart,
  bulb: IconBulb,
  book: IconBook,
  keyboard: IconKeyboard,
  github: IconBrandGithub,
  spotify: IconBrandSpotify,
};
