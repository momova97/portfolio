// Base transition configuration for consistency across animations
const baseTransition = { type: "spring", duration: 0.8 };
// Transition with a delay, useful for staggered animations
const delayedTransition = { ...baseTransition, delay: 0.5 };
// Transition without delay, for immediate animation start
const immediateTransition = { ...baseTransition, delay: 0 };

// Exporting the base transition for potential external use
export const transition = baseTransition;

// Function to generate slide animations based on direction
export const slideAnimation = (direction) => {
  // Helper function to determine the position offset based on direction
  const getPosition = (dir) => {
    const positions = { left: -100, right: 100, up: 100, down: -100 };
    return positions[dir] || 0; // Default to 0 if direction is not specified
  };

  return {
    initial: {
      // Set initial x or y position based on direction, defaulting to 0
      x: direction === "left" || direction === "right" ? getPosition(direction) : 0,
      y: direction === "up" || direction === "down" ? getPosition(direction) : 0,
      opacity: 0, // Start with the element fully transparent
      transition: delayedTransition, // Use delayed transition for initial state
    },
    animate: {
      x: 0, // Animate to original position
      y: 0,
      opacity: 1, // Fade in to full opacity
      transition: immediateTransition, // Start animation immediately
    },
    exit: {
      // Set exit position similar to initial but without opacity change
      x: direction === "left" || direction === "right" ? getPosition(direction) : 0,
      y: direction === "up" || direction === "down" ? getPosition(direction) : 0,
      transition: immediateTransition, // Start exit animation immediately
    },
  };
};

// Configuration for fade animations
export const fadeAnimation = {
  initial: { opacity: 0, transition: delayedTransition }, // Start transparent, with delay
  animate: { opacity: 1, transition: immediateTransition }, // Fade to full opacity immediately
  exit: { opacity: 0, transition: immediateTransition }, // Fade out immediately on exit
};

// Animation for text elements, sliding in from the right
export const headTextAnimation = {
  initial: { x: 100, opacity: 0 }, // Start 100px to the right and transparent
  animate: { x: 0, opacity: 1 }, // Move to original position and fade in
  transition: { ...baseTransition, damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }, // Custom spring transition for text
};

// Animation for content elements, sliding in from below
export const headContentAnimation = {
  initial: { y: 100, opacity: 0 }, // Start 100px below and transparent
  animate: { y: 0, opacity: 1 }, // Move to original position and fade in
  // Custom spring transition with delay for content, allowing for staggered animations
  transition: { ...baseTransition, damping: 7, stiffness: 30, restDelta: 0.001, duration: 0.6, delay: 0.2, delayChildren: 0.2 },
};

// Container animation, sliding in from the left
export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: delayedTransition }, // Start 100px to the left and transparent, with delay
  animate: { x: 0, opacity: 1, transition: immediateTransition }, // Move to original position and fade in immediately
  exit: { x: -100, opacity: 0, transition: immediateTransition }, // Slide out to the left immediately on exit
};

