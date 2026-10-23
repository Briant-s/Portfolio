import { Anchor, Button, Group, Stack, Text } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import { content } from '../content';
import { Section } from './Section';

export function Contact() {
  return (
    <Section id="contact" title="Get In Touch">
      <Stack gap="lg" maw={620}>
        <Text size="lg" c="dimmed">
          I’m currently open to new opportunities and collaborations. Whether you
          have a question or just want to say hi, my inbox is always open.
        </Text>
        <Button
          component="a"
          href={`mailto:${content.email}`}
          size="md"
          variant="outline"
          leftSection={<IconMail size={18} />}
          w="fit-content"
        >
          {content.email}
        </Button>
        <Group gap="lg" mt="xs">
          {content.socials.map((social) => (
            <Anchor
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              c="dimmed"
              size="sm"
            >
              {social.label} →
            </Anchor>
          ))}
        </Group>
      </Stack>
    </Section>
  );
}
