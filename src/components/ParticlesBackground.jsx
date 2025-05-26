import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // loads tsparticles-slim

// ParticlesBackground component creates a subtle, animated particle background.
export default function ParticlesBackground() {
  // useCallback is used to memoize the init function for performance
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // Initializes the tsParticles engine
  }, []);

  // useCallback is used to memoize the loaded function for performance
  const particlesLoaded = useCallback(async (container) => {
    // console.log(container); // Optional: Log the particles container
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent", // Background color is transparent to show the section's gradient
          },
        },
        fpsLimit: 60, // Limit frames per second for performance
        interactivity: {
          events: {
            // onHover: {
            //   enable: true,
            //   mode: "repulse", // Particles repel on hover
            // },
            // onClick: {
            //   enable: true,
            //   mode: "push", // Particles are pushed on click
            // },
            resize: true, // Particles adapt to window resize
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          color: {
            value: "#888888", // Particle color (a light gray)
          },
          links: {
            color: "#888888", // Link color
            distance: 150, // Max distance for links
            enable: true, // Enable links between particles
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: true, // Particles collide and bounce
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce", // Particles bounce off edges
            },
            random: false,
            speed: 1, // Speed of particles
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Number of particles
          },
          opacity: {
            value: 0.5, // Opacity of particles
          },
          shape: {
            type: "circle", // Shape of particles
          },
          size: {
            value: { min: 1, max: 3 }, // Size range of particles
          },
        },
        detectRetina: true, // Enable retina display detection
      }}
      className="absolute inset-0 w-full h-full" // Ensure it covers the whole section
    />
  );
}
