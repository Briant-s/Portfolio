import { Group, Text, UnstyledButton } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import classes from './CopyText.module.css';

interface Props {
  /** The value shown and copied. */
  value: string;
  /** Human label used in the notification (e.g. "Email"). */
  label: string;
}

/** Clickable text that copies `value` to the clipboard and notifies on success. */
export function CopyText({ value, label }: Props) {
  const clipboard = useClipboard({ timeout: 1500 });

  const handleCopy = () => {
    clipboard.copy(value);
    notifications.show({
      title: 'Copied to clipboard',
      message: `${label} copied: ${value}`,
      color: 'teal',
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
  };

  return (
    <UnstyledButton
      className={classes.button}
      onClick={handleCopy}
      aria-label={`Copy ${label.toLowerCase()} to clipboard`}
    >
      <Group gap={6} wrap="nowrap">
        <Text component="span">{value}</Text>
        {clipboard.copied ? (
          <IconCheck size={15} className={classes.icon} />
        ) : (
          <IconCopy size={15} className={classes.icon} />
        )}
      </Group>
    </UnstyledButton>
  );
}
