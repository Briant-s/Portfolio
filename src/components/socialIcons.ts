import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconWorld,
  type IconProps,
} from '@tabler/icons-react';
import type { ComponentType } from 'react';
import type { SocialLink } from '../content';

export const socialIconMap: Record<SocialLink['icon'], ComponentType<IconProps>> = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  twitter: IconBrandTwitter,
  instagram: IconBrandInstagram,
  mail: IconMail,
  website: IconWorld,
};
