import { useState } from 'react';
import {
  Anchor,
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { content } from '../content';
import { aboutIconMap } from './aboutIcons';
import { GitHubActivity } from './GitHubActivity';
import { Monkeytype } from './Monkeytype';
import { Section } from './Section';
import classes from './About.module.css';

export function About() {
  const panels = content.aboutPanels;
  const [active, setActive] = useState(0);
  const panel = panels[active];

  return (
    <Section id="about" title="About Me">
      <div className={classes.grid}>
        {/* LEFT: content panel */}
        <Box className={classes.panel}>
          <Stack gap="md">
            <Title order={3} size="h3">
              {panel.heading}
            </Title>

            {panel.image ? (
              <Image
                src={panel.image}
                alt={panel.imageAlt ?? panel.heading}
                radius={0}
                className={classes.image}
              />
            ) : null}

            {panel.body.map((paragraph, i) => (
              <Text key={i} size="lg" c="dimmed">
                {paragraph}
              </Text>
            ))}

            {panel.widget === 'github' && content.githubUsername ? (
              <GitHubActivity username={content.githubUsername} />
            ) : null}

            {panel.widget === 'monkeytype' && content.monkeytype ? (
              <Monkeytype stats={content.monkeytype} />
            ) : null}

            {panel.links && panel.links.length > 0 ? (
              <Group gap="lg">
                {panel.links.map((link) => (
                  <Anchor
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('#') ? undefined : '_blank'}
                    rel={
                      link.href.startsWith('#')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                  >
                    {link.label} →
                  </Anchor>
                ))}
              </Group>
            ) : null}

            <Group gap={6} mt="xs" c="dimmed">
              <IconMapPin size={16} />
              <Text size="sm">{content.location}</Text>
            </Group>
          </Stack>
        </Box>

        {/* RIGHT: selector bento grid (varied tile sizes) */}
        <div className={classes.buttons}>
          {panels.map((p, i) => {
            const Icon = p.icon ? aboutIconMap[p.icon] : null;
            const sizeClass = p.tileSize ? classes[p.tileSize] : '';
            return (
              <UnstyledButton
                key={p.label}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                data-active={i === active || undefined}
                className={`${classes.tile} ${sizeClass}`}
              >
                {Icon ? <Icon size={26} stroke={1.5} /> : null}
                <Text fw={600} size="sm">
                  {p.label}
                </Text>
              </UnstyledButton>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
