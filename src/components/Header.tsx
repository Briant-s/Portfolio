import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { IconFileText, IconMoon, IconSun } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { content } from '../content';
import { NameSwap } from './NameSwap';
import classes from './Header.module.css';

const navLinks = [
  { label: 'About', hash: '#about' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Contact', hash: '#contact' },
];

function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      variant="default"
      size="lg"
      radius="md"
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(computed === 'dark' ? 'light' : 'dark')}
    >
      {computed === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const scrolled = scroll.y > 20;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lenis = useLenis();
  const onHome = pathname === '/';

  // Navigate to a section. On the home page, scroll via Lenis; elsewhere, go to
  // the home route with the hash so the section scrolls into view after load.
  const goToSection = (hash: string) => {
    close();
    if (onHome) {
      const el = document.querySelector<HTMLElement>(hash);
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -60 });
        else el.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', hash);
      }
    } else {
      navigate(`/${hash}`);
    }
  };

  const goHome = () => {
    close();
    if (onHome) {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const links = navLinks.map((link) => (
    <a
      key={link.hash}
      href={onHome ? link.hash : `/${link.hash}`}
      className={classes.link}
      onClick={(e) => {
        e.preventDefault();
        goToSection(link.hash);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Box
      component="header"
      className={classes.header}
      data-scrolled={scrolled || undefined}
    >
      <Container size="lg" h="100%">
        <Group h="100%" justify="space-between">
          <Box className={classes.logo} fw={700} fz="lg">
            {content.githubHandle ? (
              <NameSwap
                primary={content.name}
                secondary={content.githubHandle}
                onClick={goHome}
              />
            ) : (
              <Text
                component="a"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  goHome();
                }}
              >
                {content.name}
              </Text>
            )}
          </Box>

          <Group gap="lg" visibleFrom="sm">
            <Group gap="md">{links}</Group>
            {content.resumeUrl ? (
              <Button
                component="a"
                href={content.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="outline"
                leftSection={<IconFileText size={16} />}
              >
                Resume
              </Button>
            ) : null}
            <ThemeToggle />
          </Group>

          <Group gap="sm" hiddenFrom="sm">
            <ThemeToggle />
            <Burger opened={opened} onClick={toggle} size="sm" aria-label="Toggle navigation" />
          </Group>
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="lg"
        title={content.name}
        hiddenFrom="sm"
        position="right"
      >
        <Stack gap="md">
          {links}
          {content.resumeUrl ? (
            <Button
              component="a"
              href={content.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              leftSection={<IconFileText size={16} />}
              onClick={close}
            >
              Resume
            </Button>
          ) : null}
        </Stack>
      </Drawer>
    </Box>
  );
}
