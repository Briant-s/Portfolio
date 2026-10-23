import { useState } from 'react';
import { UnstyledButton } from '@mantine/core';
import classes from './NameSwap.module.css';

interface Props {
  /** Default text (your name). */
  primary: string;
  /** Text shown on hover/tap (e.g. your GitHub handle). */
  secondary: string;
  /** Apply the gradient accent to both layers. */
  gradient?: boolean;
  /** Optional click handler (e.g. navigate home for the header logo). */
  onClick?: () => void;
  className?: string;
}

/**
 * Vertical slide-swap between two strings. Swaps on hover (desktop) and
 * toggles on tap (mobile). Inherits typography from its parent.
 */
export function NameSwap({ primary, secondary, gradient, onClick, className }: Props) {
  const [swapped, setSwapped] = useState(false);
  const accent = gradient ? ' accentText' : '';

  return (
    <UnstyledButton
      className={`${classes.nameSwap}${className ? ` ${className}` : ''}`}
      data-swapped={swapped || undefined}
      onMouseEnter={() => setSwapped(true)}
      onMouseLeave={() => setSwapped(false)}
      onClick={() => {
        if (onClick) onClick();
        else setSwapped((s) => !s);
      }}
      aria-label={swapped ? primary : secondary}
    >
      <span className={`${classes.layer} ${classes.primary}${accent}`}>
        {primary}
      </span>
      <span aria-hidden className={`${classes.layer} ${classes.secondary}${accent}`}>
        {secondary}
      </span>
    </UnstyledButton>
  );
}
