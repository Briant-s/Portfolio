import { ActionIcon, Container, Divider, Group, Stack, Text } from '@mantine/core';
import { content } from '../content';
import { socialIconMap } from './socialIcons';

export function Footer() {
  return (
    <Container size="lg" py="xl" component="footer">
      <Divider mb="lg" />
      <Stack align="center" gap="sm">
        <Group gap="xs">
          {content.socials.map((social) => {
            const Icon = socialIconMap[social.icon];
            return (
              <ActionIcon
                key={social.href}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                color="gray"
                size="lg"
                aria-label={social.label}
              >
                <Icon size={20} />
              </ActionIcon>
            );
          })}
        </Group>
        <Text c="dimmed" size="sm" ta="center">
          © {new Date().getFullYear()} {content.name}. Built with React &amp; Mantine.
        </Text>
      </Stack>
    </Container>
  );
}
