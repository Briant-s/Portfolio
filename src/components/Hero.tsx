import {
  Anchor,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowDown, IconFileCv } from "@tabler/icons-react";
import { content } from "../content";
import { CopyText } from "./CopyText";
import { NameSwap } from "./NameSwap";
import classes from "./Hero.module.css";
import linkBtn from "./linkButton.module.css";

export function Hero() {
  return (
    <section id="hero" className={classes.hero}>
      <Container size="lg" w="100%">
        <Stack gap="md" maw={720}>
          <Text className={classes.greeting} fw={600}>
            Hi, my name is
          </Text>
          <Title className={classes.name}>
            {content.githubHandle ? (
              <NameSwap
                primary={content.name}
                secondary={content.githubHandle}
                gradient
              />
            ) : (
              <span className="accentText">{content.name}</span>
            )}
          </Title>
          <Title order={2} className={classes.role} c="dimmed">
            {content.role}
            {content.school ? " " : null}
            {content.school ? (
              content.schoolUrl ? (
                <Anchor
                  href={content.schoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  inherit
                >
                  {content.school}
                </Anchor>
              ) : (
                content.school
              )
            ) : null}
          </Title>
          <Text size="lg" c="dimmed" maw={560}>
            {content.tagline}
          </Text>
          <Group>
            <CopyText value={content.email} label="Email" />
            {content.phone ? (
              <CopyText value={content.phone} label="Phone" />
            ) : null}
          </Group>
          <Group mt="md">
            <Button
              component="a"
              href="#projects"
              size="md"
              variant="outline"
              rightSection={<IconArrowDown size={18} />}
            >
              View my work
            </Button>
            {content.resumeUrl ? (
              <Button
                component="a"
                href={content.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                variant="subtle"
                className={linkBtn.linkButton}
                leftSection={<IconFileCv size={18} />}
              >
                Résumé
              </Button>
            ) : null}
          </Group>
        </Stack>
      </Container>
    </section>
  );
}
